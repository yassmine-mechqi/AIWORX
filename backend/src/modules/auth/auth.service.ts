import { createHash, randomBytes, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { sql } from "../../db/index.js";
import { env } from "../../config/env.js";

import type {
  AuthTokenPayload,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "./auth.types.js";

type UserRow = {
  id: string;
  email: string;
  passwordHash: string | null;
  firstName: string;
  lastName: string;
  phone: string | null;
  status: string;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  sessionVersion?: number;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function validatePassword(password: string): void {
  if (password.length < 8) {
    throw new Error("PASSWORD_TOO_SHORT");
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9\s]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter) {
    throw new Error("PASSWORD_TOO_WEAK");
  }
}

function sanitizeUser(user: UserRow): AuthUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createToken(user: AuthUser, sessionVersion: number): string {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
    sessionVersion,
  };

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
}

export async function registerUser(
  input: RegisterInput,
): Promise<{
  user: AuthUser;
  verificationToken: string;
}> {
  const email =
    typeof input?.email === "string"
      ? normalizeEmail(input.email)
      : "";
  const firstName =
    typeof input?.firstName === "string"
      ? input.firstName.trim()
      : "";
  const lastName =
    typeof input?.lastName === "string"
      ? input.lastName.trim()
      : "";
  const password =
    typeof input?.password === "string"
      ? input.password
      : "";
  const phone =
    typeof input?.phone === "string"
      ? input.phone.trim() || null
      : null;

  if (!email) {
    throw new Error("EMAIL_REQUIRED");
  }

  if (!firstName) {
    throw new Error("FIRST_NAME_REQUIRED");
  }

  if (!lastName) {
    throw new Error("LAST_NAME_REQUIRED");
  }

  validatePassword(password);

  const existingUsers = await sql<UserRow[]>`
    SELECT
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt"
    FROM public."user"
    WHERE email = ${email}
    LIMIT 1
  `;

  if (existingUsers.length > 0) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const verificationToken = randomBytes(32).toString("hex");
  const verificationTokenHash = createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const createdUsers = await sql<UserRow[]>`
    INSERT INTO public."user" (
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      "emailVerificationTokenHash",
      "emailVerificationExpiresAt",
      "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      ${email},
      ${passwordHash},
      ${firstName},
      ${lastName},
      ${phone},
      ${verificationTokenHash},
      NOW() + INTERVAL '24 hours',
      NOW()
    )
    RETURNING
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt"
  `;

  const createdUser = createdUsers[0];

  if (!createdUser) {
    throw new Error("USER_CREATION_FAILED");
  }

  const user = sanitizeUser(createdUser);
  return {
    user,
    verificationToken,
  };
}

export async function issueEmailVerificationToken(
  emailInput: string,
): Promise<{ email: string; verificationToken: string } | null> {
  const email = normalizeEmail(emailInput);
  const users = await sql<{ id: string; email: string }[]>`
    SELECT id, email
    FROM public."user"
    WHERE email = ${email}
      AND (
        status = 'PENDING'
        OR (status = 'ACTIVE' AND "emailVerifiedAt" IS NULL)
      )
    LIMIT 1
  `;
  const user = users[0];
  if (!user) return null;

  const verificationToken = randomBytes(32).toString("hex");
  const verificationTokenHash = createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  await sql`
    UPDATE public."user"
    SET "emailVerificationTokenHash" = ${verificationTokenHash},
        "emailVerificationExpiresAt" = NOW() + INTERVAL '24 hours',
        "updatedAt" = NOW()
    WHERE id = ${user.id}
      AND (
        status = 'PENDING'
        OR (status = 'ACTIVE' AND "emailVerifiedAt" IS NULL)
      )
  `;
  return { email: user.email, verificationToken };
}

export async function issuePasswordResetToken(
  emailInput: string,
): Promise<{ email: string; resetToken: string } | null> {
  const email = normalizeEmail(emailInput);
  const users = await sql<{ id: string; email: string }[]>`
    SELECT id, email
    FROM public."user"
    WHERE email = ${email}
      AND status = 'ACTIVE'
      AND "emailVerifiedAt" IS NOT NULL
    LIMIT 1
  `;
  const user = users[0];
  if (!user) return null;

  const resetToken = randomBytes(32).toString("hex");
  const resetTokenHash = createHash("sha256").update(resetToken).digest("hex");
  await sql`
    UPDATE public."user"
    SET "passwordResetTokenHash" = ${resetTokenHash},
        "passwordResetExpiresAt" = NOW() + INTERVAL '1 hour',
        "updatedAt" = NOW()
    WHERE id = ${user.id}
  `;
  return { email: user.email, resetToken };
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<boolean> {
  validatePassword(newPassword);
  if (!/^[a-f0-9]{64}$/.test(token)) return false;

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const matchingUsers = await sql<{ id: string }[]>`
    SELECT id
    FROM public."user"
    WHERE "passwordResetTokenHash" = ${tokenHash}
      AND "passwordResetExpiresAt" > NOW()
      AND status = 'ACTIVE'
    LIMIT 1
  `;
  if (matchingUsers.length === 0) return false;

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const updatedUsers = await sql<{ id: string }[]>`
    UPDATE public."user"
    SET "passwordHash" = ${passwordHash},
        "passwordResetTokenHash" = NULL,
        "passwordResetExpiresAt" = NULL,
        "sessionVersion" = "sessionVersion" + 1,
        "updatedAt" = NOW()
    WHERE "passwordResetTokenHash" = ${tokenHash}
      AND "passwordResetExpiresAt" > NOW()
      AND status = 'ACTIVE'
    RETURNING id
  `;
  return updatedUsers.length > 0;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const users = await sql<{ passwordHash: string | null }[]>`
    SELECT "passwordHash"
    FROM public."user"
    WHERE id = ${userId} AND status = 'ACTIVE'
    LIMIT 1
  `;
  const user = users[0];
  if (!user?.passwordHash) {
    throw new Error("CURRENT_PASSWORD_INVALID");
  }

  const currentPasswordMatches = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );
  if (!currentPasswordMatches) {
    throw new Error("CURRENT_PASSWORD_INVALID");
  }

  validatePassword(newPassword);
  if (currentPassword === newPassword) {
    throw new Error("NEW_PASSWORD_MUST_BE_DIFFERENT");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await sql`
    UPDATE public."user"
    SET "passwordHash" = ${newPasswordHash},
        "sessionVersion" = "sessionVersion" + 1,
        "updatedAt" = NOW()
    WHERE id = ${userId} AND status = 'ACTIVE'
  `;
}

export async function verifyEmailToken(token: string): Promise<AuthUser | null> {
  if (!token || token.length > 256) return null;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const users = await sql<UserRow[]>`
    UPDATE public."user"
    SET status = 'ACTIVE',
        "emailVerifiedAt" = NOW(),
        "emailVerificationTokenHash" = NULL,
        "emailVerificationExpiresAt" = NULL,
        "updatedAt" = NOW()
    WHERE "emailVerificationTokenHash" = ${tokenHash}
      AND "emailVerificationExpiresAt" > NOW()
      AND (
        status = 'PENDING'
        OR (status = 'ACTIVE' AND "emailVerifiedAt" IS NULL)
      )
    RETURNING id, email, "passwordHash", "firstName", "lastName", phone,
      status, "emailVerifiedAt", "lastLoginAt", "createdAt", "updatedAt"
  `;
  return users[0] ? sanitizeUser(users[0]) : null;
}

export async function loginUser(
  input: LoginInput,
): Promise<{
  user: AuthUser;
  token: string;
}> {
  const email = normalizeEmail(input.email);

  if (!email) {
    throw new Error("EMAIL_REQUIRED");
  }

  const users = await sql<UserRow[]>`
    SELECT
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt",
      "sessionVersion"
    FROM public."user"
    WHERE email = ${email}
    LIMIT 1
  `;

  const user = users[0];

  if (!user || !user.passwordHash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (user.status === "SUSPENDED") {
    throw new Error("USER_SUSPENDED");
  }

  if (user.status === "INACTIVE") {
    throw new Error("USER_INACTIVE");
  }

  if (user.status === "PENDING" || user.emailVerifiedAt === null) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  const updatedUsers = await sql<UserRow[]>`
    UPDATE public."user"
    SET
      "lastLoginAt" = NOW(),
      "updatedAt" = NOW()
    WHERE id = ${user.id}
    RETURNING
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt"
  `;

  const updatedUser = updatedUsers[0];

  if (!updatedUser) {
    throw new Error("LOGIN_UPDATE_FAILED");
  }

  const sanitizedUser = sanitizeUser(updatedUser);
  const token = createToken(sanitizedUser, user.sessionVersion ?? 0);

  return {
    user: sanitizedUser,
    token,
  };
}

export async function getUserById(
  userId: string,
): Promise<AuthUser | null> {
  const users = await sql<UserRow[]>`
    SELECT
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt"
    FROM public."user"
    WHERE id = ${userId}
    LIMIT 1
  `;

  const user = users[0];

  if (!user) {
    return null;
  }

  return sanitizeUser(user);
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
}

export async function getActiveUserFromToken(
  token: string,
): Promise<AuthUser | null> {
  try {
    const payload = verifyToken(token);

    if (!payload.sub) {
      return null;
    }

    const versions = await sql<{ sessionVersion: number }[]>`
      SELECT "sessionVersion"
      FROM public."user"
      WHERE id = ${payload.sub}
      LIMIT 1
    `;
    const currentSessionVersion = versions[0]?.sessionVersion;
    if (
      currentSessionVersion === undefined ||
      (payload.sessionVersion ?? 0) !== currentSessionVersion
    ) {
      return null;
    }

    const user = await getUserById(payload.sub);

    if (!user || user.status !== "ACTIVE") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

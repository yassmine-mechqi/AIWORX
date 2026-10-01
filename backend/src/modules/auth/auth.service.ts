import { randomUUID } from "node:crypto";
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
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
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

function createToken(user: AuthUser): string {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
  };

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
}

export async function registerUser(
  input: RegisterInput,
): Promise<{
  user: AuthUser;
  token: string;
}> {
  const email = normalizeEmail(input.email);
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const phone = input.phone?.trim() || null;

  if (!email) {
    throw new Error("EMAIL_REQUIRED");
  }

  if (!firstName) {
    throw new Error("FIRST_NAME_REQUIRED");
  }

  if (!lastName) {
    throw new Error("LAST_NAME_REQUIRED");
  }

  if (input.password.length < 8) {
    throw new Error("PASSWORD_TOO_SHORT");
  }

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

  const passwordHash = await bcrypt.hash(input.password, 12);

  const createdUsers = await sql<UserRow[]>`
    INSERT INTO public."user" (
      id,
      email,
      "passwordHash",
      "firstName",
      "lastName",
      phone,
      "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      ${email},
      ${passwordHash},
      ${firstName},
      ${lastName},
      ${phone},
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
  const token = createToken(user);

  return {
    user,
    token,
  };
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
      "updatedAt"
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
  const token = createToken(sanitizedUser);

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
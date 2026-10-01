import { sql } from "../../db/index.js";

import type {
UpdateUserProfileInput,
UserProfile,
UserStatus,
} from "./user.types.js";

type UserRow = {
id: string;
email: string;
firstName: string;
lastName: string;
phone: string | null;
status: UserStatus;
emailVerifiedAt: Date | null;
lastLoginAt: Date | null;
createdAt: Date;
updatedAt: Date;
};

function mapUser(row: UserRow): UserProfile {
return {
id: row.id,
email: row.email,
firstName: row.firstName,
lastName: row.lastName,
phone: row.phone,
status: row.status,
emailVerifiedAt: row.emailVerifiedAt,
lastLoginAt: row.lastLoginAt,
createdAt: row.createdAt,
updatedAt: row.updatedAt,
};
}

export async function getUserById(
userId: string,
): Promise<UserProfile | null> {
const rows = await sql`     SELECT
      id,
      email,
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

const users = rows as unknown as UserRow[];

const user = users[0];

if (!user) {
return null;
}

return mapUser(user);
}

export async function updateUserProfile(
userId: string,
input: UpdateUserProfileInput,
): Promise<UserProfile | null> {
const firstName =
input.firstName === undefined
? null
: input.firstName.trim();

const lastName =
input.lastName === undefined
? null
: input.lastName.trim();

const phone =
input.phone === undefined
? null
: input.phone?.trim() || null;

if (firstName !== null && !firstName) {
throw new Error("FIRST_NAME_REQUIRED");
}

if (lastName !== null && !lastName) {
throw new Error("LAST_NAME_REQUIRED");
}

const existingRows = await sql`     SELECT
      id,
      email,
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

const existingUsers =
existingRows as unknown as UserRow[];

const existingUser = existingUsers[0];

if (!existingUser) {
return null;
}

const newFirstName =
firstName === null
? existingUser.firstName
: firstName;

const newLastName =
lastName === null
? existingUser.lastName
: lastName;

const newPhone =
input.phone === undefined
? existingUser.phone
: phone;

const updatedRows = await sql`     UPDATE public."user"
    SET
      "firstName" = ${newFirstName},
      "lastName" = ${newLastName},
      phone = ${newPhone},
      "updatedAt" = NOW()
    WHERE id = ${userId}
    RETURNING
      id,
      email,
      "firstName",
      "lastName",
      phone,
      status,
      "emailVerifiedAt",
      "lastLoginAt",
      "createdAt",
      "updatedAt"
  `;

const updatedUsers =
updatedRows as unknown as UserRow[];

const updatedUser = updatedUsers[0];

if (!updatedUser) {
return null;
}

return mapUser(updatedUser);
}

export async function deleteUser(
userId: string,
): Promise<boolean> {
const rows = await sql`     DELETE FROM public."user"
    WHERE id = ${userId}
    RETURNING id
  `;

const deletedUsers = rows as unknown as { id: string }[];

return deletedUsers.length > 0;
}

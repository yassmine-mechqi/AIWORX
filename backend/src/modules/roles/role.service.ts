import { sql } from "../../db/index.js";

import type {
CreatePermissionInput,
CreateRoleInput,
Permission,
Role,
RoleAssignment,
RoleName,
} from "./role.types.js";

type RoleRow = {
id: string;
name: RoleName;
description: string | null;
createdAt: Date;
updatedAt: Date;
};

type PermissionRow = {
id: string;
code: string;
description: string | null;
createdById: string | null;
createdAt: Date;
updatedAt: Date;
};

type RoleAssignmentRow = {
id: string;
userId: string;
roleId: string;
organizationId: string | null;
createdById: string | null;
isActive: boolean;
createdAt: Date;
updatedAt: Date;
};

function mapRole(row: RoleRow): Role {
return {
id: row.id,
name: row.name,
description: row.description,
createdAt: row.createdAt,
updatedAt: row.updatedAt,
};
}

function mapPermission(row: PermissionRow): Permission {
return {
id: row.id,
code: row.code,
description: row.description,
createdById: row.createdById,
createdAt: row.createdAt,
updatedAt: row.updatedAt,
};
}

function mapRoleAssignment(row: RoleAssignmentRow): RoleAssignment {
return {
id: row.id,
userId: row.userId,
roleId: row.roleId,
organizationId: row.organizationId,
createdById: row.createdById,
isActive: row.isActive,
createdAt: row.createdAt,
updatedAt: row.updatedAt,
};
}

/* =====================================================
ROLES
===================================================== */

export async function createRole(
input: CreateRoleInput,
): Promise<Role> {
const description =
input.description?.trim() || null;

const roles = await sql<RoleRow[]>`
  INSERT INTO public."role" (
    id,
    name,
    description,
    "updatedAt"
  )
  VALUES (
    gen_random_uuid(),
    ${input.name},
    ${description},
    NOW()
  )
  RETURNING
    id,
    name,
    description,
    "createdAt",
    "updatedAt"
`;

const role = roles[0];

if (!role) {
throw new Error("ROLE_CREATION_FAILED");
}

return mapRole(role);
}

export async function getRoleById(
roleId: string,
): Promise<Role | null> {
const roles = await sql<RoleRow[]>`     SELECT
      id,
      name,
      description,
      "createdAt",
      "updatedAt"
    FROM public."role"
    WHERE id = ${roleId}
    LIMIT 1
  `;

const role = roles[0];

if (!role) {
return null;
}

return mapRole(role);
}

export async function getRoleByName(
name: RoleName,
): Promise<Role | null> {
const roles = await sql<RoleRow[]>`     SELECT
      id,
      name,
      description,
      "createdAt",
      "updatedAt"
    FROM public."role"
    WHERE name = ${name}
    LIMIT 1
  `;

const role = roles[0];

if (!role) {
return null;
}

return mapRole(role);
}

export async function getAllRoles(): Promise<Role[]> {
const roles = await sql<RoleRow[]>`     SELECT
      id,
      name,
      description,
      "createdAt",
      "updatedAt"
    FROM public."role"
    ORDER BY name ASC
  `;

return roles.map(mapRole);
}

/* =====================================================
PERMISSIONS
===================================================== */

export async function createPermission(
createdById: string | null,
input: CreatePermissionInput,
): Promise<Permission> {
const code = input.code.trim().toUpperCase();

if (!code) {
throw new Error("PERMISSION_CODE_REQUIRED");
}

const description =
input.description?.trim() || null;

const permissions = await sql<PermissionRow[]>`
  INSERT INTO public."permission" (
    id,
    code,
    description,
    "createdById",
    "updatedAt"
  )
  VALUES (
    gen_random_uuid(),
    ${code},
    ${description},
    ${createdById},
    NOW()
  )
  RETURNING
    id,
    code,
    description,
    "createdById",
    "createdAt",
    "updatedAt"
`;

const permission = permissions[0];

if (!permission) {
throw new Error("PERMISSION_CREATION_FAILED");
}

return mapPermission(permission);
}

export async function getPermissionById(
permissionId: string,
): Promise<Permission | null> {
const permissions = await sql<PermissionRow[]>`     SELECT
      id,
      code,
      description,
      "createdById",
      "createdAt",
      "updatedAt"
    FROM public."permission"
    WHERE id = ${permissionId}
    LIMIT 1
  `;

const permission = permissions[0];

if (!permission) {
return null;
}

return mapPermission(permission);
}

export async function getAllPermissions(): Promise<Permission[]> {
const permissions = await sql<PermissionRow[]>`     SELECT
      id,
      code,
      description,
      "createdById",
      "createdAt",
      "updatedAt"
    FROM public."permission"
    ORDER BY code ASC
  `;

return permissions.map(mapPermission);
}

/* =====================================================
ROLE PERMISSIONS
===================================================== */

export async function assignPermissionToRole(
roleId: string,
permissionId: string,
): Promise<void> {
const role = await getRoleById(roleId);

if (!role) {
throw new Error("ROLE_NOT_FOUND");
}

const permission = await getPermissionById(permissionId);

if (!permission) {
throw new Error("PERMISSION_NOT_FOUND");
}

await sql`     INSERT INTO public."rolePermission" (
      id,
      "roleId",
      "permissionId"
    )
    VALUES (
      gen_random_uuid(),
      ${roleId},
      ${permissionId}
    )
    ON CONFLICT ("roleId", "permissionId")
    DO NOTHING
  `;
}

export async function getPermissionsForRole(
roleId: string,
): Promise<Permission[]> {
const permissions = await sql<PermissionRow[]>`     SELECT
      p.id,
      p.code,
      p.description,
      p."createdById",
      p."createdAt",
      p."updatedAt"
    FROM public."permission" p
    INNER JOIN public."rolePermission" rp
      ON rp."permissionId" = p.id
    WHERE rp."roleId" = ${roleId}
    ORDER BY p.code ASC
  `;

return permissions.map(mapPermission);
}

/* =====================================================
ROLE ASSIGNMENTS
===================================================== */

export async function assignRoleToUser(
userId: string,
roleId: string,
organizationId: string | null,
createdById: string | null,
): Promise<RoleAssignment> {
const roles = await sql<RoleRow[]>`     SELECT
      id,
      name,
      description,
      "createdAt",
      "updatedAt"
    FROM public."role"
    WHERE id = ${roleId}
    LIMIT 1
  `;

if (!roles[0]) {
throw new Error("ROLE_NOT_FOUND");
}

const users = await sql<{ id: string }[]>`     SELECT id
    FROM public."user"
    WHERE id = ${userId}
    LIMIT 1
  `;

if (!users[0]) {
throw new Error("USER_NOT_FOUND");
}

const assignments = await sql<RoleAssignmentRow[]>`
  INSERT INTO public."roleAssignment" (
    id,
    "userId",
    "roleId",
    "organizationId",
    "createdById",
    "isActive",
    "createdAt",
    "updatedAt"
  )
  VALUES (
    gen_random_uuid(),
    ${userId},
    ${roleId},
    ${organizationId},
    ${createdById},
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT ("userId", "roleId", "organizationId")
  DO UPDATE SET
    "isActive" = true,
    "updatedAt" = NOW()
  RETURNING
    id,
    "userId",
    "roleId",
    "organizationId",
    "createdById",
    "isActive",
    "createdAt",
    "updatedAt"
`;

const assignment = assignments[0];

if (!assignment) {
throw new Error("ROLE_ASSIGNMENT_FAILED");
}

return mapRoleAssignment(assignment);
}

export async function getUserRoles(
userId: string,
): Promise<Role[]> {
const roles = await sql<RoleRow[]>`     SELECT
      r.id,
      r.name,
      r.description,
      r."createdAt",
      r."updatedAt"
    FROM public."role" r
    INNER JOIN public."roleAssignment" ra
      ON ra."roleId" = r.id
    WHERE ra."userId" = ${userId}
      AND ra."isActive" = true
    ORDER BY r.name ASC
  `;

return roles.map(mapRole);
}

export async function getUserPermissions(
userId: string,
): Promise<Permission[]> {
const permissions = await sql<PermissionRow[]>`     SELECT DISTINCT
      p.id,
      p.code,
      p.description,
      p."createdById",
      p."createdAt",
      p."updatedAt"
    FROM public."permission" p
    INNER JOIN public."rolePermission" rp
      ON rp."permissionId" = p.id
    INNER JOIN public."roleAssignment" ra
      ON ra."roleId" = rp."roleId"
    WHERE ra."userId" = ${userId}
      AND ra."isActive" = true
    ORDER BY p.code ASC
  `;

return permissions.map(mapPermission);
}

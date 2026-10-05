export type RoleName =
  | "CLIENT"
  | "PROVIDER"
  | "ADVISOR"
  | "QUALITY_EXPERT"
  | "FINANCE_ADMIN"
  | "ADMIN";

export interface Role {
  id: string;
  name: RoleName;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  code: string;
  description: string | null;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleAssignment {
  id: string;
  userId: string;
  roleId: string;
  organizationId: string | null;
  createdById: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: Date;
}

export interface CreatePermissionInput {
  code: string;
  description?: string | null;
}

export interface CreateRoleInput {
  name: RoleName;
  description?: string | null;
}

export interface AssignRoleInput {
  userId: string;
  roleId: string;
  organizationId?: string | null;
}
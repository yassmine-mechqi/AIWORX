export type OrganizationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED";

export interface Organization {
  id: string;
  name: string;
  legalName: string | null;
  description: string | null;
  status: OrganizationStatus;
  country: string | null;
  city: string | null;
  address: string | null;
  postalCode: string | null;
  website: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationInput {
  name: string;
  legalName?: string | null;
  description?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  postalCode?: string | null;
  website?: string | null;
}

export interface UpdateOrganizationInput {
  name?: string;
  legalName?: string | null;
  description?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  postalCode?: string | null;
  website?: string | null;
}

export interface OrganizationMembership {
  id: string;
  userId: string;
  organizationId: string;
  isActive: boolean;
  joinedAt: Date;
  leftAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
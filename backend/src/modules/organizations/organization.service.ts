import { sql } from "../../db/index.js";

import type {
  CreateOrganizationInput,
  Organization,
  UpdateOrganizationInput,
} from "./organization.types.js";

type OrganizationRow = {
  id: string;
  name: string;
  legalName: string | null;
  description: string | null;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  country: string | null;
  city: string | null;
  address: string | null;
  postalCode: string | null;
  website: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

function mapOrganization(row: OrganizationRow): Organization {
  return {
    id: row.id,
    name: row.name,
    legalName: row.legalName,
    description: row.description,
    status: row.status,
    country: row.country,
    city: row.city,
    address: row.address,
    postalCode: row.postalCode,
    website: row.website,
    ownerId: row.ownerId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function createOrganization(
  ownerId: string,
  input: CreateOrganizationInput,
): Promise<Organization> {
  const name = input.name.trim();

  if (!name) {
    throw new Error("ORGANIZATION_NAME_REQUIRED");
  }

  const legalName = input.legalName?.trim() || null;
  const description = input.description?.trim() || null;
  const country = input.country?.trim() || null;
  const city = input.city?.trim() || null;
  const address = input.address?.trim() || null;
  const postalCode = input.postalCode?.trim() || null;
  const website = input.website?.trim() || null;

  const organizations = await sql<OrganizationRow[]>`
    INSERT INTO public."organization" (
      id,
      name,
      "legalName",
      description,
      status,
      country,
      city,
      address,
      "postalCode",
      website,
      "ownerId",
      "updatedAt"
    )
    VALUES (
      gen_random_uuid(),
      ${name},
      ${legalName},
      ${description},
      'ACTIVE',
      ${country},
      ${city},
      ${address},
      ${postalCode},
      ${website},
      ${ownerId},
      NOW()
    )
    RETURNING
      id,
      name,
      "legalName",
      description,
      status,
      country,
      city,
      address,
      "postalCode",
      website,
      "ownerId",
      "createdAt",
      "updatedAt"
  `;

  const organization = organizations[0];

  if (!organization) {
    throw new Error("ORGANIZATION_CREATION_FAILED");
  }

  return mapOrganization(organization);
}

export async function getOrganizationById(
  organizationId: string,
): Promise<Organization | null> {
  const organizations = await sql<OrganizationRow[]>`
    SELECT
      id,
      name,
      "legalName",
      description,
      status,
      country,
      city,
      address,
      "postalCode",
      website,
      "ownerId",
      "createdAt",
      "updatedAt"
    FROM public."organization"
    WHERE id = ${organizationId}
    LIMIT 1
  `;

  const organization = organizations[0];

  if (!organization) {
    return null;
  }

  return mapOrganization(organization);
}

export async function getOrganizationsByOwner(
  ownerId: string,
): Promise<Organization[]> {
  const organizations = await sql<OrganizationRow[]>`
    SELECT
      id,
      name,
      "legalName",
      description,
      status,
      country,
      city,
      address,
      "postalCode",
      website,
      "ownerId",
      "createdAt",
      "updatedAt"
    FROM public."organization"
    WHERE "ownerId" = ${ownerId}
    ORDER BY "createdAt" DESC
  `;

  return organizations.map(mapOrganization);
}

export async function updateOrganization(
  organizationId: string,
  ownerId: string,
  input: UpdateOrganizationInput,
): Promise<Organization> {
  const existing = await getOrganizationById(organizationId);

  if (!existing) {
    throw new Error("ORGANIZATION_NOT_FOUND");
  }

  if (existing.ownerId !== ownerId) {
    throw new Error("FORBIDDEN");
  }

  const name =
    input.name !== undefined
      ? input.name.trim()
      : existing.name;

  if (!name) {
    throw new Error("ORGANIZATION_NAME_REQUIRED");
  }

  const legalName =
    input.legalName !== undefined
      ? input.legalName?.trim() || null
      : existing.legalName;

  const description =
    input.description !== undefined
      ? input.description?.trim() || null
      : existing.description;

  const country =
    input.country !== undefined
      ? input.country?.trim() || null
      : existing.country;

  const city =
    input.city !== undefined
      ? input.city?.trim() || null
      : existing.city;

  const address =
    input.address !== undefined
      ? input.address?.trim() || null
      : existing.address;

  const postalCode =
    input.postalCode !== undefined
      ? input.postalCode?.trim() || null
      : existing.postalCode;

  const website =
    input.website !== undefined
      ? input.website?.trim() || null
      : existing.website;

  const organizations = await sql<OrganizationRow[]>`
    UPDATE public."organization"
    SET
      name = ${name},
      "legalName" = ${legalName},
      description = ${description},
      country = ${country},
      city = ${city},
      address = ${address},
      "postalCode" = ${postalCode},
      website = ${website},
      "updatedAt" = NOW()
    WHERE id = ${organizationId}
      AND "ownerId" = ${ownerId}
    RETURNING
      id,
      name,
      "legalName",
      description,
      status,
      country,
      city,
      address,
      "postalCode",
      website,
      "ownerId",
      "createdAt",
      "updatedAt"
  `;

  const organization = organizations[0];

  if (!organization) {
    throw new Error("ORGANIZATION_UPDATE_FAILED");
  }

  return mapOrganization(organization);
}


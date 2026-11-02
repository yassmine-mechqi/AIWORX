import { sql } from "../../db/index.js";

import type {
  CreateProviderProfileInput,
  ProviderProfile,
  UpdateProviderProfileInput,
} from "./provider.types.js";

type ProviderProfileRow = {
  id: string;
  userId: string;
  organizationId: string | null;

  displayName: string | null;
  headline: string | null;
  bio: string | null;

  country: string | null;
  city: string | null;
  address: string | null;

  skills: string | null;
  categories: string | null;
  sectors: string | null;
  portfolio: string | null;

  yearsExperience: number | null;

  hourlyRate: string | null;

  currency: string;

  score: string | null;

  isAvailable: boolean;

  createdAt: Date;
  updatedAt: Date;
};

function mapProviderProfile(row: ProviderProfileRow): ProviderProfile {
  return {
    id: row.id,
    userId: row.userId,
    organizationId: row.organizationId,

    displayName: row.displayName,
    headline: row.headline,
    bio: row.bio,

    country: row.country,
    city: row.city,
    address: row.address,

    skills: row.skills,
    categories: row.categories,
    sectors: row.sectors,
    portfolio: row.portfolio,

    yearsExperience: row.yearsExperience,

    hourlyRate: row.hourlyRate,
    currency: row.currency,

    score: row.score,

    isAvailable: row.isAvailable,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// Helper function to check if user has provider role
export async function hasProviderRole(userId: string): Promise<boolean> {
  const rows = await sql<{ id: string }[]>`
    SELECT r.id
    FROM public."roleAssignment" ra
    INNER JOIN public."role" r
      ON r.id = ra."roleId"
    WHERE ra."userId" = ${userId}
      AND r.name = 'PROVIDER'
      AND ra."isActive" = true
    LIMIT 1
  `;

  return rows.length > 0;
}

function getMapProviderProfile(row: ProviderProfileRow): ProviderProfile {
  return {
    id: row.id,
    userId: row.userId,
    organizationId: row.organizationId,

    displayName: row.displayName,
    headline: row.headline,
    bio: row.bio,

    country: row.country,
    city: row.city,
    address: row.address,

    skills: row.skills,
    categories: row.categories,
    sectors: row.sectors,
    portfolio: row.portfolio,

    yearsExperience: row.yearsExperience,

    hourlyRate: row.hourlyRate,
    currency: row.currency,

    score: row.score,

    isAvailable: row.isAvailable,

    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// Get provider profile by user ID
export async function getProviderProfileByUserId(
  userId: string,
): Promise<ProviderProfile | null> {
  const profiles = await sql<ProviderProfileRow[]>`
    SELECT
      id,
      "userId",
      "organizationId",
      "displayName",
      headline,
      bio,
      country,
      city,
      address,
      skills,
      categories,
      sectors,
      portfolio,
      "yearsExperience",
      "hourlyRate"::text AS "hourlyRate",
      currency,
      score::text AS score,
      "isAvailable",
      "createdAt",
      "updatedAt"
    FROM public."providerProfile"
    WHERE "userId" = ${userId}
    LIMIT 1
  `;

  const profile = profiles[0];

  if (!profile) {
    return null;
  }

  return getMapProviderProfile(profile);
}

// Create provider profile
export async function createProviderProfile(
  userId: string,
  input: CreateProviderProfileInput,
): Promise<ProviderProfile> {
  const existing = await getProviderProfileByUserId(userId);

  if (existing) {
    throw new Error("PROVIDER_PROFILE_ALREADY_EXISTS");
  }

  const displayName = input.displayName?.trim() || null;
  const headline = input.headline?.trim() || null;
  const bio = input.bio?.trim() || null;

  const country = input.country?.trim() || null;
  const city = input.city?.trim() || null;
  const address = input.address?.trim() || null;

  const currency = input.currency?.trim().toUpperCase() || "MAD";

  const profiles = await sql<ProviderProfileRow[]>`
    INSERT INTO public."providerProfile" (
      id,
      "userId",
      "organizationId",
      "displayName",
      headline,
      bio,
      country,
      city,
      address,
      skills,
      categories,
      sectors,
      portfolio,
      "yearsExperience",
      "hourlyRate",
      currency,
      "createdAt",
      "updatedAt",
      "isAvailable"
    )
    VALUES (
      gen_random_uuid(),
      ${userId},
      ${input.organizationId ?? null},
      ${displayName},
      ${headline},
      ${bio},
      ${country},
      ${city},
      ${address},
      ${input.skills ?? null},
      ${input.categories ?? null},
      ${input.sectors ?? null},
      ${input.portfolio ?? null},
      ${input.yearsExperience ?? null},
      ${input.hourlyRate ?? null},
      ${currency},
      NOW(),
      NOW(),
      ${input.isAvailable ?? true}
    )
    RETURNING
      id,
      "userId",
      "organizationId",
      "displayName",
      headline,
      bio,
      country,
      city,
      address,
      skills,
      categories,
      sectors,
      portfolio,
      "yearsExperience",
      "hourlyRate"::text AS "hourlyRate",
      currency,
      score::text AS score,
      "isAvailable",
      "createdAt",
      "updatedAt"
  `;

  const profile = profiles[0];

  if (!profile) {
    throw new Error("PROVIDER_PROFILE_CREATION_FAILED");
  }

  return getMapProviderProfile(profile);
}

// Update provider profile
export async function updateProviderProfile(
  userId: string,
  input: UpdateProviderProfileInput,
): Promise<ProviderProfile> {
  const existing = await getProviderProfileByUserId(userId);

  if (!existing) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  const profiles = await sql<ProviderProfileRow[]>`
    UPDATE public."providerProfile"
    SET
      "organizationId" = COALESCE(
        ${input.organizationId === undefined ? null : input.organizationId},
        "organizationId"
      ),

      "displayName" = COALESCE(
        ${input.displayName === undefined ? null : input.displayName?.trim() || null},
        "displayName"
      ),

      headline = COALESCE(
        ${input.headline === undefined ? null : input.headline?.trim() || null},
        headline
      ),

      bio = COALESCE(
        ${input.bio === undefined ? null : input.bio?.trim() || null},
        bio
      ),

      country = COALESCE(
        ${input.country === undefined ? null : input.country?.trim() || null},
        country
      ),

      city = COALESCE(
        ${input.city === undefined ? null : input.city?.trim() || null},
        city
      ),

      address = COALESCE(
        ${input.address === undefined ? null : input.address?.trim() || null},
        address
      ),

      skills = COALESCE(
        ${input.skills === undefined ? null : input.skills},
        skills
      ),

      categories = COALESCE(
        ${input.categories === undefined ? null : input.categories},
        categories
      ),

      sectors = COALESCE(
        ${input.sectors === undefined ? null : input.sectors},
        sectors
      ),

      portfolio = COALESCE(
        ${input.portfolio === undefined ? null : input.portfolio},
        portfolio
      ),

      "yearsExperience" = COALESCE(
        ${input.yearsExperience === undefined ? null : input.yearsExperience},
        "yearsExperience"
      ),

      "hourlyRate" = COALESCE(
        ${input.hourlyRate === undefined ? null : input.hourlyRate},
        "hourlyRate"
      ),

      currency = COALESCE(
        ${input.currency === undefined ? null : input.currency?.trim().toUpperCase()},
        currency
      ),

      "isAvailable" = COALESCE(
        ${input.isAvailable === undefined ? null : input.isAvailable},
        "isAvailable"
      ),

      "updatedAt" = NOW()
    WHERE "userId" = ${userId}

    RETURNING
      id,
      "userId",
      "organizationId",
      "displayName",
      headline,
      bio,
      country,
      city,
      address,
      skills,
      categories,
      sectors,
      portfolio,
      "yearsExperience",
      "hourlyRate"::text AS "hourlyRate",
      currency,
      score::text AS score,
      "isAvailable",
      "createdAt",
      "updatedAt"
  `;

  const profile = profiles[0];

  if (!profile) {
    throw new Error("PROVIDER_PROFILE_UPDATE_FAILED");
  }

  return getMapProviderProfile(profile);
}

// Delete provider profile
export async function deleteProviderProfile(
  userId: string,
): Promise<void> {
  const result = await sql`
    DELETE FROM public."providerProfile"
    WHERE "userId" = ${userId}
  `;

  if (result.count === 0) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
}

export interface ProviderProfile {
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
}

export interface CreateProviderProfileInput {
  organizationId?: string | null;

  displayName?: string | null;
  headline?: string | null;
  bio?: string | null;

  country?: string | null;
  city?: string | null;
  address?: string | null;

  skills?: string | null;
  categories?: string | null;
  sectors?: string | null;
  portfolio?: string | null;

  yearsExperience?: number | null;

  hourlyRate?: number | string | null;
  currency?: string;

  isAvailable?: boolean;
}

export interface UpdateProviderProfileInput {
  organizationId?: string | null;

  displayName?: string | null;
  headline?: string | null;
  bio?: string | null;

  country?: string | null;
  city?: string | null;
  address?: string | null;

  skills?: string | null;
  categories?: string | null;
  sectors?: string | null;
  portfolio?: string | null;

  yearsExperience?: number | null;

  hourlyRate?: number | string | null;
  currency?: string;

  isAvailable?: boolean;
}
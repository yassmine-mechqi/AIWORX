-- Run this migration only on the intended development database.
BEGIN;

CREATE TABLE IF NOT EXISTS public."apiRateLimitBucket" (
  "bucketKey" text PRIMARY KEY,
  "requestCount" integer NOT NULL CHECK ("requestCount" > 0),
  "expiresAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "apiRateLimitBucket_expiresAt_idx"
  ON public."apiRateLimitBucket" ("expiresAt");

COMMIT;

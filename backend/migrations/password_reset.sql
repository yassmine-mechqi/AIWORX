-- Apply only to the intended development database after checking its connection.
BEGIN;

ALTER TABLE public."user"
  ADD COLUMN IF NOT EXISTS "passwordResetTokenHash" text,
  ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" timestamptz;

COMMIT;
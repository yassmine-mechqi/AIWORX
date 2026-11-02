-- Apply only to the intended development database after checking its connection.
-- Existing sessions start at version 0 and remain valid until their normal expiry.
BEGIN;

ALTER TABLE public."user"
  ADD COLUMN IF NOT EXISTS "sessionVersion" integer NOT NULL DEFAULT 0;

COMMIT;

-- Apply only to the intended development database after reviewing the preview query.
-- This keeps one active global assignment per user and role, and deactivates
-- duplicate rows without deleting their history.
BEGIN;

WITH ranked_global_assignments AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY "userId", "roleId"
      ORDER BY "createdAt" ASC, id ASC
    ) AS duplicate_number
  FROM public."roleAssignment"
  WHERE "organizationId" IS NULL
    AND "isActive" = true
)
UPDATE public."roleAssignment" AS assignment
SET "isActive" = false,
    "updatedAt" = NOW()
FROM ranked_global_assignments AS ranked
WHERE assignment.id = ranked.id
  AND ranked.duplicate_number > 1;

CREATE UNIQUE INDEX IF NOT EXISTS "roleAssignment_active_global_user_role_key"
  ON public."roleAssignment" ("userId", "roleId")
  WHERE "organizationId" IS NULL AND "isActive" = true;

COMMIT;

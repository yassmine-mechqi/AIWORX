import { createHash } from "node:crypto";

import { sql } from "../db/index.js";

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

/** Atomically counts requests in PostgreSQL so limits are shared across API processes. */
export async function consumeRateLimit(
  bucket: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  // Store a digest instead of the client's IP or route key in the database.
  const bucketKey = createHash("sha256").update(bucket).digest("hex");
  const [row] = await sql<{ requestCount: number; retryAfterSeconds: number }[]>`
    INSERT INTO public."apiRateLimitBucket" AS current_bucket
      ("bucketKey", "requestCount", "expiresAt", "updatedAt")
    VALUES (
      ${bucketKey},
      1,
      NOW() + (${windowMs} * INTERVAL '1 millisecond'),
      NOW()
    )
    ON CONFLICT ("bucketKey") DO UPDATE SET
      "requestCount" = CASE
        WHEN current_bucket."expiresAt" <= NOW() THEN 1
        ELSE LEAST(current_bucket."requestCount" + 1, ${maxRequests} + 1)
      END,
      "expiresAt" = CASE
        WHEN current_bucket."expiresAt" <= NOW() THEN EXCLUDED."expiresAt"
        ELSE current_bucket."expiresAt"
      END,
      "updatedAt" = NOW()
    RETURNING
      "requestCount",
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM ("expiresAt" - NOW()))))::integer
        AS "retryAfterSeconds"
  `;

  if (!row) {
    throw new Error("Rate limit counter did not return a result");
  }

  return {
    allowed: Number(row.requestCount) <= maxRequests,
    retryAfterSeconds: Number(row.retryAfterSeconds),
  };
}

export async function cleanupExpiredRateLimitBuckets(): Promise<void> {
  await sql`
    DELETE FROM public."apiRateLimitBucket"
    WHERE "expiresAt" <= NOW()
  `;
}

import type { FastifyInstance } from "fastify";

import { env } from "../config/env.js";
import { sql } from "../db/index.js";

export async function dbTestRoutes(
  app: FastifyInstance,
): Promise<void> {
  if (env.nodeEnv === "production") {
    return;
  }

  app.get("/db-test", async () => {
    const result = await sql`
      SELECT
        current_database() AS database,
        current_user AS user,
        NOW() AS server_time
    `;

    return {
      success: true,
      database: result,
    };
  });
}

import { sql } from "../src/db/index.js";

async function main() {
  const result = await sql`
    SELECT
      "userId",
      "roleId",
      "organizationId",
      COUNT(*) AS count
    FROM public."roleAssignment"
    GROUP BY
      "userId",
      "roleId",
      "organizationId"
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC;
  `;

  console.log("=== DOUBLONS roleAssignment ===");
  console.dir(result, { depth: null });

  await sql.end();
}

main().catch((error) => {
  console.error("ERREUR:", error);
  process.exit(1);
});
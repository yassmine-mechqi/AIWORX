import "dotenv/config";
import postgres from "postgres";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = postgres(databaseUrl);

async function main() {
  const rows = await sql`
    SELECT
      id,
      "userId",
      "roleId",
      "organizationId",
      "createdById",
      "isActive",
      "createdAt",
      "updatedAt"
    FROM public."roleAssignment"
    WHERE "userId" = '9d6fdc52-80f8-4874-8cc5-7d1bcfe77ad8'
      AND "roleId" = '45fbe69d-a1df-4707-93d8-fa2910b1879d'
    ORDER BY "createdAt";
  `;

  console.table(rows);

  await sql.end();
}

main().catch(async (error) => {
  console.error("ERREUR COMPLETE:");
  console.error(error);
  await sql.end();
  process.exit(1);
});
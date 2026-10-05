import { sql } from "../src/db/index.js";

async function main() {
  const result = await sql`
    SELECT
      conname AS constraint_name,
      pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = 'public."role"'::regclass
      AND contype = 'c';
  `;

  console.log("=== CONTRAINTES DE LA TABLE role ===");
  console.dir(result, { depth: null });

  await sql.end();
}

main().catch((error) => {
  console.error("ERREUR:", error);
  process.exit(1);
});
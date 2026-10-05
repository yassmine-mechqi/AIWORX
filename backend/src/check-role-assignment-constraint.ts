import { sql } from "../src/db/index.js";

async function main() {
  const result = await sql`
    SELECT
      conname AS constraint_name,
      contype AS constraint_type,
      pg_get_constraintdef(oid) AS definition
    FROM pg_constraint
    WHERE conrelid = 'public."roleAssignment"'::regclass
    ORDER BY conname;
  `;

  console.log("=== CONTRAINTES DE roleAssignment ===");
  console.dir(result, { depth: null });

  await sql.end();
}

main().catch((error) => {
  console.error("ERREUR:", error);
  process.exit(1);
});
import "dotenv/config";
import postgres from "postgres";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = postgres(databaseUrl);

async function main() {
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;

  console.log("TABLES:");
  console.table(tables);

  const columns = await sql`
    SELECT
      table_name,
      column_name,
      data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name IN (
        'role',
        'permission',
        'roleAssignment',
        'rolePermission'
      )
    ORDER BY table_name, ordinal_position;
  `;

  console.log("ROLE/PERMISSION COLUMNS:");
  console.table(columns);

  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
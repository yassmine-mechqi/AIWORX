import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

console.log("Connexion à la base de données...");

// Table role
await sql`
  CREATE TABLE IF NOT EXISTS public."role" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
console.log("Table 'role' créée");

// Table permission
await sql`
  CREATE TABLE IF NOT EXISTS public."permission" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    "createdById" UUID REFERENCES public."user"(id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
console.log("Table 'permission' créée");

// Table rolePermission
await sql`
  CREATE TABLE IF NOT EXISTS public."rolePermission" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL REFERENCES public."role"(id) ON DELETE CASCADE,
    "permissionId" UUID NOT NULL REFERENCES public."permission"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE("roleId", "permissionId")
  )
`;
console.log("Table 'rolePermission' créée");

// Table roleAssignment
await sql`
  CREATE TABLE IF NOT EXISTS public."roleAssignment" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
    "roleId" UUID NOT NULL REFERENCES public."role"(id) ON DELETE CASCADE,
    "organizationId" UUID REFERENCES public."organization"(id) ON DELETE CASCADE,
    "createdById" UUID REFERENCES public."user"(id),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE("userId", "roleId", "organizationId")
  )
`;
console.log("Table 'roleAssignment' créée");

// Vérification
const tables = await sql`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  ORDER BY table_name
`;

console.log("\nTables dans la base de données :");
for (const t of tables) {
  console.log(`  - ${t.table_name}`);
}

await sql.end();
console.log("\nTerminé !");

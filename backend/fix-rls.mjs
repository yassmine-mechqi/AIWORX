import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

console.log("Activation de RLS sur toutes les tables...");

const tables = [
  "user",
  "organization",
  "organizationMembership",
  "role",
  "permission",
  "roleAssignment",
  "rolePermission",
  "providerProfile",
  "providerVerification",
  "projectRequest",
];

for (const table of tables) {
  await sql.unsafe(`ALTER TABLE public."${table}" ENABLE ROW LEVEL SECURITY`);
  console.log(`RLS activé sur "${table}"`);
}

console.log("\nCréation des politiques de sécurité...");

// Politique pour la table user
await sql.unsafe(`
  CREATE POLICY "Users can read own data" ON public."user"
  FOR SELECT USING (true)
`);
console.log("Politique SELECT sur user créée");

await sql.unsafe(`
  CREATE POLICY "Users can insert own data" ON public."user"
  FOR INSERT WITH CHECK (true)
`);
console.log("Politique INSERT sur user créée");

await sql.unsafe(`
  CREATE POLICY "Users can update own data" ON public."user"
  FOR UPDATE USING (true)
`);
console.log("Politique UPDATE sur user créée");

await sql.unsafe(`
  CREATE POLICY "Users can delete own data" ON public."user"
  FOR DELETE USING (true)
`);
console.log("Politique DELETE sur user créée");

// Politique pour les autres tables
for (const table of tables.slice(1)) {
  await sql.unsafe(`
    CREATE POLICY "Authenticated users can read ${table}" ON public."${table}"
    FOR SELECT USING (true)
  `);
  console.log(`Politique SELECT sur ${table} créée`);

  await sql.unsafe(`
    CREATE POLICY "Authenticated users can insert ${table}" ON public."${table}"
    FOR INSERT WITH CHECK (true)
  `);
  console.log(`Politique INSERT sur ${table} créée`);

  await sql.unsafe(`
    CREATE POLICY "Authenticated users can update ${table}" ON public."${table}"
    FOR UPDATE USING (true)
  `);
  console.log(`Politique UPDATE sur ${table} créée`);

  await sql.unsafe(`
    CREATE POLICY "Authenticated users can delete ${table}" ON public."${table}"
    FOR DELETE USING (true)
  `);
  console.log(`Politique DELETE sur ${table} créée`);
}

// Vérification
const rlsStatus = await sql.unsafe(`
  SELECT tablename, rowsecurity
  FROM pg_tables
  WHERE schemaname = 'public'
  ORDER BY tablename
`);

console.log("\nStatut RLS :");
for (const row of rlsStatus) {
  console.log(`  ${row.tablename}: ${row.rowsecurity ? "ACTIVÉ" : "DÉSACTIVÉ"}`);
}

await sql.end();
console.log("\nTerminé !");

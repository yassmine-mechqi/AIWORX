import "dotenv/config";
import { sql } from "./db/index.js";

async function main() {
  try {
    console.log("TEST INSERT PERMISSION...");

    // Utilisation d'un code unique basé sur la date pour éviter les conflits
    const uniqueCode = `TEST_PERMISSION_${new Date().toISOString().split('T')[0]}`;
    
    const result = await sql`
      INSERT INTO public."permission" (
        id,
        code,
        description,
        "createdById",
        "updatedAt"
      )
      VALUES (
        gen_random_uuid(),
        ${uniqueCode},
        'Permission de test',
        NULL,
        NOW()
      )
      RETURNING
        id,
        code,
        description,
        "createdById",
        "createdAt",
        "updatedAt"
    `;

    console.log("RESULT:");
    console.dir(result, { depth: null });

    await sql.end();
  } catch (error) {
    console.error("ERREUR COMPLETE:");
    console.error(error);

    await sql.end();
    process.exit(1);
  }
}

main();
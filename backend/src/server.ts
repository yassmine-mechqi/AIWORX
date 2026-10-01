import { buildApp } from "./app/app.js";
import { env } from "./config/env.js";

const app = buildApp();

try {
  await app.listen({
    port: env.port,
    host: env.host,
  });

  console.log(
    `AIWORX API running on http://${env.host}:${env.port}`,
  );
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
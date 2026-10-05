import Fastify from "fastify";
import cookie from "@fastify/cookie";

import { healthRoutes } from "../routes/health.routes.js";
import { dbTestRoutes } from "../routes/db-test.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { organizationRoutes } from "../modules/organizations/organization.routes.js";
import { roleRoutes } from "../modules/roles/role.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cookie);

  app.register(healthRoutes);
  app.register(dbTestRoutes);
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(organizationRoutes);
  app.register(roleRoutes);

  return app;
}
import Fastify from "fastify";
import cookie from "@fastify/cookie";

import { healthRoutes } from "../routes/health.routes.js";
import { dbTestRoutes } from "../routes/db-test.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { organizationRoutes } from "../modules/organizations/organization.routes.js";
import { roleRoutes } from "../modules/roles/role.routes.js";
import {providerRoutes} from "../modules/providers/provider.routes.js";
import {
  cleanupExpiredRateLimitBuckets,
  consumeRateLimit,
} from "../security/rate-limit.js";

const authRateLimits: Record<string, { maxRequests: number; windowMs: number }> = {
  "POST /auth/login": { maxRequests: 10, windowMs: 15 * 60 * 1000 },
  "POST /auth/register": { maxRequests: 10, windowMs: 60 * 60 * 1000 },
  "POST /auth/forgot-password": { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  "POST /auth/resend-verification": { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  "POST /auth/verify-email": { maxRequests: 10, windowMs: 15 * 60 * 1000 },
  "POST /auth/reset-password": { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  "POST /auth/change-password": { maxRequests: 5, windowMs: 15 * 60 * 1000 },
};

export function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: process.env["VERCEL"] === "1",
    ajv: {
      customOptions: {
        removeAdditional: false,
      },
    },
  });

  app.addHook("preHandler", async (request, reply) => {
    const pathname = new URL(request.url, "http://localhost").pathname;
    const routeKey = `${request.method} ${pathname}`;
    const limit = authRateLimits[routeKey];

    if (!limit) {
      return;
    }

    let result: Awaited<ReturnType<typeof consumeRateLimit>>;
    try {
      result = await consumeRateLimit(
        `${request.ip}:${routeKey}`,
        limit.maxRequests,
        limit.windowMs,
      );
    } catch (error) {
      request.log.error(error);
      return reply.code(503).send({
        success: false,
        error: "RATE_LIMIT_UNAVAILABLE",
      });
    }

    if (!result.allowed) {
      return reply
        .header("Retry-After", String(result.retryAfterSeconds))
        .code(429)
        .send({
          success: false,
          error: "TOO_MANY_REQUESTS",
          message: "Trop de tentatives. Réessaie après le délai indiqué.",
        });
    }
  });

  const rateLimitCleanupTimer = setInterval(() => {
    void cleanupExpiredRateLimitBuckets().catch((error: unknown) => {
      app.log.error(error, "Failed to clean expired rate limit buckets");
    });
  }, 15 * 60 * 1000);
  rateLimitCleanupTimer.unref();
  app.addHook("onClose", async () => clearInterval(rateLimitCleanupTimer));

  app.get("/", async () => ({ message: "AIWORX API is running" }));
  app.register(cookie);

  app.register(healthRoutes);
  app.register(dbTestRoutes);
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(organizationRoutes);
  app.register(roleRoutes);
  app.register(providerRoutes);
  return app;
}

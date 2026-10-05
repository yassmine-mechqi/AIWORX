import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  createOrganization,
  getOrganizationById,
  getOrganizationsByOwner,
  updateOrganization,
} from "./organization.service.js";

import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "./organization.types.js";

import { verifyToken } from "../auth/auth.service.js";

const COOKIE_NAME = "aiworx_token";

function getTokenFromRequest(
  request: FastifyRequest,
): string | null {
  const cookieToken = request.cookies[COOKIE_NAME];

  if (cookieToken) {
    return cookieToken;
  }

  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization
    .substring("Bearer ".length)
    .trim();
}

function getAuthenticatedUserId(
  request: FastifyRequest,
): string | null {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);

    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export async function organizationRoutes(
  app: FastifyInstance,
): Promise<void> {
  // GET /organizations
  app.get(
    "/organizations",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const userId = getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        const organizations =
          await getOrganizationsByOwner(userId);

        return reply.code(200).send({
          success: true,
          organizations,
        });
      } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
          success: false,
          error: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  );

  // GET /organizations/:id
  app.get(
    "/organizations/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      const userId = getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        const organization =
          await getOrganizationById(request.params.id);

        if (!organization) {
          return reply.code(404).send({
            success: false,
            error: "ORGANIZATION_NOT_FOUND",
          });
        }

        if (organization.ownerId !== userId) {
          return reply.code(403).send({
            success: false,
            error: "FORBIDDEN",
          });
        }

        return reply.code(200).send({
          success: true,
          organization,
        });
      } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
          success: false,
          error: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  );

  // POST /organizations
  app.post(
    "/organizations",
    async (
      request: FastifyRequest<{
        Body: CreateOrganizationInput;
      }>,
      reply: FastifyReply,
    ) => {
      const userId = getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        const organization =
          await createOrganization(
            userId,
            request.body,
          );

        return reply.code(201).send({
          success: true,
          organization,
        });
      } catch (error) {
        if (
          error instanceof Error &&
          error.message ===
            "ORGANIZATION_NAME_REQUIRED"
        ) {
          return reply.code(400).send({
            success: false,
            error: "ORGANIZATION_NAME_REQUIRED",
          });
        }

        request.log.error(error);

        return reply.code(500).send({
          success: false,
          error: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  );

  // PATCH /organizations/:id
  app.patch(
    "/organizations/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
        Body: UpdateOrganizationInput;
      }>,
      reply: FastifyReply,
    ) => {
      const userId = getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        const organization =
          await updateOrganization(
            request.params.id,
            userId,
            request.body,
          );

        return reply.code(200).send({
          success: true,
          organization,
        });
      } catch (error) {
        if (!(error instanceof Error)) {
          return reply.code(500).send({
            success: false,
            error: "INTERNAL_SERVER_ERROR",
          });
        }

        switch (error.message) {
          case "ORGANIZATION_NOT_FOUND":
            return reply.code(404).send({
              success: false,
              error: "ORGANIZATION_NOT_FOUND",
            });

          case "FORBIDDEN":
            return reply.code(403).send({
              success: false,
              error: "FORBIDDEN",
            });

          case "ORGANIZATION_NAME_REQUIRED":
            return reply.code(400).send({
              success: false,
              error: "ORGANIZATION_NAME_REQUIRED",
            });

          default:
            request.log.error(error);

            return reply.code(500).send({
              success: false,
              error: "INTERNAL_SERVER_ERROR",
            });
        }
      }
    },
  );
}
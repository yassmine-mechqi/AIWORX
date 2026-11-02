import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { getActiveUserFromToken } from "../auth/auth.service.js";
import { hasUserPermission } from "../roles/role.service.js";

import {
  createProviderProfile,
  getProviderProfileByUserId,
  hasProviderRole,
  updateProviderProfile,
} from "./provider.service.js";

import type {
  CreateProviderProfileInput,
  UpdateProviderProfileInput,
} from "./provider.types.js";

const COOKIE_NAME = "aiworx_token";

async function getAuthenticatedUserId(
  request: FastifyRequest,
): Promise<string | null> {
  const cookieToken = request.cookies[COOKIE_NAME];
  const authorization = request.headers.authorization;

  const token =
    cookieToken ??
    (authorization?.startsWith("Bearer ")
      ? authorization.substring("Bearer ".length).trim()
      : null);

  if (!token) {
    return null;
  }

  const user = await getActiveUserFromToken(token);
  return user?.id ?? null;
}

export async function providerRoutes(
  app: FastifyInstance,
): Promise<void> {
  // GET /providers/me
  app.get(
    "/providers/me",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const userId = await getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        if (!(await hasProviderRole(userId))) {
          return reply.code(403).send({
            success: false,
            error: "PROVIDER_ROLE_REQUIRED",
          });
        }

        const profile =
          await getProviderProfileByUserId(userId);

        if (!profile) {
          return reply.code(404).send({
            success: false,
            error: "PROVIDER_PROFILE_NOT_FOUND",
          });
        }

        if (
          !(await hasUserPermission(
            userId,
            "PROVIDER_PROFILE_READ",
            profile.organizationId,
          ))
        ) {
          return reply.code(403).send({
            success: false,
            error: "PERMISSION_REQUIRED",
          });
        }

        return reply.code(200).send({
          success: true,
          profile,
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

  // POST /providers/me
  app.post(
    "/providers/me",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const userId = await getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        if (!(await hasProviderRole(userId))) {
          return reply.code(403).send({
            success: false,
            error: "PROVIDER_ROLE_REQUIRED",
          });
        }

        const input = request.body as CreateProviderProfileInput;

        if (
          !(await hasUserPermission(
            userId,
            "PROVIDER_PROFILE_CREATE",
            input.organizationId ?? null,
          ))
        ) {
          return reply.code(403).send({
            success: false,
            error: "PERMISSION_REQUIRED",
          });
        }

        const existing =
          await getProviderProfileByUserId(userId);

        if (existing) {
          return reply.code(409).send({
            success: false,
            error: "PROVIDER_PROFILE_ALREADY_EXISTS",
          });
        }

        const profile = await createProviderProfile(userId, input);

        return reply.code(201).send({
          success: true,
          profile,
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

  // PATCH /providers/me
  app.patch(
    "/providers/me",
    async (
      request: FastifyRequest<{
        Body: UpdateProviderProfileInput;
      }>,
      reply: FastifyReply,
    ) => {
      const userId = await getAuthenticatedUserId(request);

      if (!userId) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      try {
        if (!(await hasProviderRole(userId))) {
          return reply.code(403).send({
            success: false,
            error: "PROVIDER_ROLE_REQUIRED",
          });
        }

        const currentProfile = await getProviderProfileByUserId(userId);

        if (!currentProfile) {
          return reply.code(404).send({
            success: false,
            error: "PROVIDER_PROFILE_NOT_FOUND",
          });
        }

        if (
          !(await hasUserPermission(
            userId,
            "PROVIDER_PROFILE_UPDATE",
            currentProfile.organizationId,
          ))
        ) {
          return reply.code(403).send({
            success: false,
            error: "PERMISSION_REQUIRED",
          });
        }

        const nextOrganizationId =
          request.body.organizationId === undefined
            ? currentProfile.organizationId
            : request.body.organizationId ?? null;

        if (
          nextOrganizationId !== currentProfile.organizationId &&
          !(await hasUserPermission(
            userId,
            "PROVIDER_PROFILE_UPDATE",
            nextOrganizationId,
          ))
        ) {
          return reply.code(403).send({
            success: false,
            error: "PERMISSION_REQUIRED",
          });
        }

        const profile = await updateProviderProfile(
          userId,
          request.body,
        );

        if (!profile) {
          return reply.code(404).send({
            success: false,
            error: "PROVIDER_PROFILE_NOT_FOUND",
          });
        }

        return reply.code(200).send({
          success: true,
          profile,
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
}

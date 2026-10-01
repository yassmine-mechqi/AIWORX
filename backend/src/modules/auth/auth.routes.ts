import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import {
  getUserById,
  loginUser,
  registerUser,
  verifyToken,
} from "./auth.service.js";

import type {
  LoginInput,
  RegisterInput,
} from "./auth.types.js";

const COOKIE_NAME = "aiworx_token";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env["NODE_ENV"] === "production",
  path: "/",
};

function getTokenFromRequest(
  request: FastifyRequest,
): string | null {
  const cookieToken = request.cookies[COOKIE_NAME];

  if (cookieToken) {
    return cookieToken;
  }

  const authorization = request.headers.authorization;

  if (!authorization) {
    return null;
  }

  if (!authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.substring("Bearer ".length).trim();
}

async function getAuthenticatedUser(
  request: FastifyRequest,
) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);

    if (!payload.sub) {
      return null;
    }

    return await getUserById(payload.sub);
  } catch {
    return null;
  }
}

export async function authRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.post(
    "/auth/register",
    async (
      request: FastifyRequest<{
        Body: RegisterInput;
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const result = await registerUser(request.body);

        reply.setCookie(
          COOKIE_NAME,
          result.token,
          cookieOptions,
        );

        return reply.code(201).send({
          success: true,
          user: result.user,
        });
      } catch (error) {
        if (!(error instanceof Error)) {
          return reply.code(500).send({
            success: false,
            error: "INTERNAL_SERVER_ERROR",
          });
        }

        switch (error.message) {
          case "EMAIL_REQUIRED":
          case "FIRST_NAME_REQUIRED":
          case "LAST_NAME_REQUIRED":
            return reply.code(400).send({
              success: false,
              error: error.message,
            });

          case "PASSWORD_TOO_SHORT":
            return reply.code(400).send({
              success: false,
              error: "PASSWORD_TOO_SHORT",
              message:
                "Le mot de passe doit contenir au moins 8 caractères.",
            });

          case "EMAIL_ALREADY_EXISTS":
            return reply.code(409).send({
              success: false,
              error: "EMAIL_ALREADY_EXISTS",
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

  app.post(
    "/auth/login",
    async (
      request: FastifyRequest<{
        Body: LoginInput;
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const result = await loginUser(request.body);

        reply.setCookie(
          COOKIE_NAME,
          result.token,
          cookieOptions,
        );

        return reply.code(200).send({
          success: true,
          user: result.user,
        });
      } catch (error) {
        if (!(error instanceof Error)) {
          return reply.code(500).send({
            success: false,
            error: "INTERNAL_SERVER_ERROR",
          });
        }

        switch (error.message) {
          case "EMAIL_REQUIRED":
            return reply.code(400).send({
              success: false,
              error: error.message,
            });

          case "INVALID_CREDENTIALS":
            return reply.code(401).send({
              success: false,
              error: "INVALID_CREDENTIALS",
            });

          case "USER_SUSPENDED":
            return reply.code(403).send({
              success: false,
              error: "USER_SUSPENDED",
            });

          case "USER_INACTIVE":
            return reply.code(403).send({
              success: false,
              error: "USER_INACTIVE",
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

  app.post(
    "/auth/logout",
    async (
      _request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      reply.clearCookie(COOKIE_NAME, {
        path: "/",
      });

      return reply.code(200).send({
        success: true,
        message: "Déconnexion réussie.",
      });
    },
  );

  app.get(
    "/auth/me",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const user = await getAuthenticatedUser(request);

      if (!user) {
        return reply.code(401).send({
          success: false,
          error: "UNAUTHENTICATED",
        });
      }

      return reply.code(200).send({
        success: true,
        user,
      });
    },
  );
}
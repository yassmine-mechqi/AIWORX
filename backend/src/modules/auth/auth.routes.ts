import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { env } from "../../config/env.js";
import {
  getActiveUserFromToken,
  changePassword,
  issueEmailVerificationToken,
  issuePasswordResetToken,
  loginUser,
  registerUser,
  resetPassword,
  verifyEmailToken,
} from "./auth.service.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "./auth.email.js";

import type {
  LoginInput,
  RegisterInput,
} from "./auth.types.js";

const COOKIE_NAME = "aiworx_token";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: env.nodeEnv === "production",
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

  return getActiveUserFromToken(token);
}

export async function authRoutes(
  app: FastifyInstance,
): Promise<void> {
  app.post(
    "/auth/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password", "firstName", "lastName"],
          additionalProperties: false,
          properties: {
            email: {
              type: "string",
              format: "email",
              maxLength: 254,
            },
            password: { type: "string", minLength: 8, maxLength: 128 },
            firstName: { type: "string", minLength: 1, maxLength: 100 },
            lastName: { type: "string", minLength: 1, maxLength: 100 },
            phone: { type: ["string", "null"], maxLength: 30 },
          },
        },
      },
    },
    async (
      request: FastifyRequest<{
        Body: RegisterInput;
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const result = await registerUser(request.body);
        await sendVerificationEmail(
          result.user.email,
          result.verificationToken,
        );

        return reply.code(201).send({
          success: true,
          user: result.user,
          ...(env.nodeEnv === "development" &&
          (!env.resendApiKey || !env.emailFrom)
            ? { verificationToken: result.verificationToken }
            : {}),
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

          case "PASSWORD_TOO_WEAK":
            return reply.code(400).send({
              success: false,
              error: "PASSWORD_TOO_WEAK",
              message:
                "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
            });

          case "EMAIL_ALREADY_EXISTS":
            return reply.code(409).send({
              success: false,
              error: "EMAIL_ALREADY_EXISTS",
            });

          case "EMAIL_DELIVERY_NOT_CONFIGURED":
          case "EMAIL_DELIVERY_FAILED":
            request.log.error(error);
            return reply.code(503).send({
              success: false,
              error: "EMAIL_DELIVERY_UNAVAILABLE",
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
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          additionalProperties: false,
          properties: {
            email: {
              type: "string",
              format: "email",
              maxLength: 254,
            },
            password: { type: "string", minLength: 1, maxLength: 128 },
          },
        },
      },
    },
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

          case "EMAIL_NOT_VERIFIED":
            return reply.code(403).send({
              success: false,
              error: "EMAIL_NOT_VERIFIED",
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

  app.get<{ Querystring: { token?: string } }>(
    "/auth/verify-email",
    async (request, reply) => {
      const token = request.query.token ?? "";
      if (!/^[a-f0-9]{64}$/.test(token)) {
        return reply.code(400).send({
          success: false,
          error: "INVALID_OR_EXPIRED_VERIFICATION_TOKEN",
        });
      }
      return reply
        .type("text/html; charset=utf-8")
        .code(200)
        .send(`<!doctype html><html lang="en"><meta charset="utf-8"><title>Verify AIWORX email</title><body><h1>Verify your email</h1><p>Press the button to activate your AIWORX account.</p><button id="verify">Verify email</button><p id="result"></p><script>document.getElementById('verify').onclick=async()=>{const r=await fetch('/auth/verify-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:'${token}'})});document.getElementById('result').textContent=r.ok?'Email verified. Your account is active.':'This verification link is invalid or expired.';};</script></body></html>`);
    },
  );

  app.post<{ Body: { token?: string } }>(
    "/auth/verify-email",
    {
      schema: {
        body: {
          type: "object",
          required: ["token"],
          additionalProperties: false,
          properties: {
            token: { type: "string", pattern: "^[a-fA-F0-9]{64}$" },
          },
        },
      },
    },
    async (request, reply) => {
      const user = await verifyEmailToken(request.body?.token ?? "");
      if (!user) {
        return reply.code(400).send({
          success: false,
          error: "INVALID_OR_EXPIRED_VERIFICATION_TOKEN",
        });
      }
      return reply.code(200).send({
        success: true,
        message: "Email verified. Your account is active.",
      });
    },
  );

  app.post<{ Body: { email?: string } }>(
    "/auth/resend-verification",
    {
      schema: {
        body: {
          type: "object",
          required: ["email"],
          additionalProperties: false,
          properties: {
            email: {
              type: "string",
              format: "email",
              maxLength: 254,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const email =
        typeof request.body?.email === "string"
          ? request.body.email.trim()
          : "";
      if (!email) {
        return reply.code(400).send({ success: false, error: "EMAIL_REQUIRED" });
      }

      try {
        const issued = await issueEmailVerificationToken(email);
        if (issued) {
          await sendVerificationEmail(issued.email, issued.verificationToken);
          return reply.code(200).send({
            success: true,
            message: "If the account requires verification, a verification email has been sent.",
            ...(env.nodeEnv === "development" &&
            (!env.resendApiKey || !env.emailFrom)
              ? { verificationToken: issued.verificationToken }
              : {}),
          });
        }
        return reply.code(200).send({
          success: true,
          message: "If the account requires verification, a verification email has been sent.",
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(503).send({
          success: false,
          error: "EMAIL_DELIVERY_UNAVAILABLE",
        });
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

  app.post<{ Body: { email?: string } }>(
    "/auth/forgot-password",
    {
      schema: {
        body: {
          type: "object",
          required: ["email"],
          additionalProperties: false,
          properties: {
            email: {
              type: "string",
              format: "email",
              maxLength: 254,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const email =
        typeof request.body?.email === "string"
          ? request.body.email.trim()
          : "";
      if (!email) {
        return reply.code(400).send({ success: false, error: "EMAIL_REQUIRED" });
      }

      try {
        const issued = await issuePasswordResetToken(email);
        if (issued) {
          await sendPasswordResetEmail(issued.email, issued.resetToken);
        }

        return reply.code(200).send({
          success: true,
          message:
            "If an active account exists for this email, password reset instructions have been sent.",
          ...(issued && env.nodeEnv === "development" &&
          (!env.resendApiKey || !env.emailFrom)
            ? { resetToken: issued.resetToken }
            : {}),
        });
      } catch (error) {
        request.log.error(error);
        if (
          error instanceof Error &&
          (error.message === "EMAIL_DELIVERY_NOT_CONFIGURED" ||
            error.message === "EMAIL_DELIVERY_FAILED")
        ) {
          return reply.code(200).send({
            success: true,
            message:
              "If an active account exists for this email, password reset instructions have been sent.",
          });
        }
        return reply.code(503).send({
          success: false,
          error: "PASSWORD_RESET_REQUEST_FAILED",
        });
      }
    },
  );

  app.post<{
    Body: { token?: string; newPassword?: string };
  }>(
    "/auth/reset-password",
    {
      schema: {
        body: {
          type: "object",
          required: ["token", "newPassword"],
          additionalProperties: false,
          properties: {
            token: { type: "string", pattern: "^[a-fA-F0-9]{64}$" },
            newPassword: { type: "string", minLength: 8, maxLength: 128 },
          },
        },
      },
    },
    async (request, reply) => {
    const token =
      typeof request.body?.token === "string" ? request.body.token : "";
    const newPassword =
      typeof request.body?.newPassword === "string"
        ? request.body.newPassword
        : "";
    try {
      const reset = await resetPassword(token, newPassword);
      if (!reset) {
        return reply.code(400).send({
          success: false,
          error: "INVALID_OR_EXPIRED_RESET_TOKEN",
        });
      }
      return reply.code(200).send({
        success: true,
        message: "Password has been reset. Please log in with your new password.",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "PASSWORD_TOO_SHORT") {
        return reply.code(400).send({
          success: false,
          error: "PASSWORD_TOO_SHORT",
          message: "Le mot de passe doit contenir au moins 8 caractères.",
        });
      }
      if (error instanceof Error && error.message === "PASSWORD_TOO_WEAK") {
        return reply.code(400).send({
          success: false,
          error: "PASSWORD_TOO_WEAK",
          message:
            "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
        });
      }
      request.log.error(error);
      return reply.code(500).send({ success: false, error: "INTERNAL_SERVER_ERROR" });
    }
    },
  );

  app.post<{
    Body: { currentPassword?: string; newPassword?: string };
  }>(
    "/auth/change-password",
    {
      schema: {
        body: {
          type: "object",
          required: ["currentPassword", "newPassword"],
          additionalProperties: false,
          properties: {
            currentPassword: { type: "string", minLength: 1, maxLength: 128 },
            newPassword: { type: "string", minLength: 8, maxLength: 128 },
          },
        },
      },
    },
    async (request, reply) => {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return reply.code(401).send({
        success: false,
        error: "UNAUTHENTICATED",
      });
    }

    const currentPassword =
      typeof request.body?.currentPassword === "string"
        ? request.body.currentPassword
        : "";
    const newPassword =
      typeof request.body?.newPassword === "string"
        ? request.body.newPassword
        : "";

    try {
      await changePassword(user.id, currentPassword, newPassword);
      reply.clearCookie(COOKIE_NAME, { path: "/" });
      return reply.code(200).send({
        success: true,
        message: "Password changed. Please log in again with your new password.",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "CURRENT_PASSWORD_INVALID") {
          return reply.code(400).send({
            success: false,
            error: "CURRENT_PASSWORD_INVALID",
          });
        }
        if (error.message === "PASSWORD_TOO_SHORT") {
          return reply.code(400).send({
            success: false,
            error: "PASSWORD_TOO_SHORT",
            message: "Le mot de passe doit contenir au moins 8 caractères.",
          });
        }
        if (error.message === "PASSWORD_TOO_WEAK") {
          return reply.code(400).send({
            success: false,
            error: "PASSWORD_TOO_WEAK",
            message:
              "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
          });
        }
        if (error.message === "NEW_PASSWORD_MUST_BE_DIFFERENT") {
          return reply.code(400).send({
            success: false,
            error: "NEW_PASSWORD_MUST_BE_DIFFERENT",
          });
        }
      }
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
      });
    }
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

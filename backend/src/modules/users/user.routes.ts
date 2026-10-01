import type {
FastifyInstance,
FastifyReply,
FastifyRequest,
} from "fastify";

import {
deleteUser,
getUserById,
updateUserProfile,
} from "./user.service.js";

import type { UpdateUserProfileInput } from "./user.types.js";

import {
verifyToken,
} from "../auth/auth.service.js";

const COOKIE_NAME = "aiworx_token";

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

if (!payload.sub) {
  return null;
}

return payload.sub;


} catch {
return null;
}
}

export async function userRoutes(
app: FastifyInstance,
): Promise<void> {
app.get(
"/users/me",
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

  const user = await getUserById(userId);

  if (!user) {
    return reply.code(404).send({
      success: false,
      error: "USER_NOT_FOUND",
    });
  }

  return reply.code(200).send({
    success: true,
    user,
  });
},


);

app.patch(
"/users/me",
async (
request: FastifyRequest<{
Body: UpdateUserProfileInput;
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
    const user = await updateUserProfile(
      userId,
      request.body,
    );

    if (!user) {
      return reply.code(404).send({
        success: false,
        error: "USER_NOT_FOUND",
      });
    }

    return reply.code(200).send({
      success: true,
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "FIRST_NAME_REQUIRED"
    ) {
      return reply.code(400).send({
        success: false,
        error: "FIRST_NAME_REQUIRED",
      });
    }

    if (
      error instanceof Error &&
      error.message === "LAST_NAME_REQUIRED"
    ) {
      return reply.code(400).send({
        success: false,
        error: "LAST_NAME_REQUIRED",
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

app.delete(
"/users/me",
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

  const deleted = await deleteUser(userId);

  if (!deleted) {
    return reply.code(404).send({
      success: false,
      error: "USER_NOT_FOUND",
    });
  }

  reply.clearCookie(COOKIE_NAME, {
    path: "/",
  });

  return reply.code(200).send({
    success: true,
    message: "Compte supprimé avec succès.",
  });
},


);
}

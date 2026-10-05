import type {
FastifyInstance,
FastifyReply,
FastifyRequest,
} from "fastify";

import {
verifyToken,
} from "../auth/auth.service.js";

import {
assignPermissionToRole,
assignRoleToUser,
createPermission,
createRole,
getAllPermissions,
getAllRoles,
getPermissionsForRole,
getRoleById,
getUserPermissions,
getUserRoles,
} from "./role.service.js";

import type {
CreatePermissionInput,
CreateRoleInput,
} from "./role.types.js";

const COOKIE_NAME = "aiworx_token";

function getTokenFromRequest(
request: FastifyRequest,
): string | null {
const cookieToken = (request as any).cookies[COOKIE_NAME];

if (cookieToken) {
return cookieToken;
}

const authorization =
request.headers.authorization;

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

function requireAuthentication(
request: FastifyRequest,
reply: FastifyReply,
): string | null {
const userId =
getAuthenticatedUserId(request);

if (!userId) {
reply.code(401).send({
success: false,
error: "UNAUTHENTICATED",
});


return null;


}

return userId;
}

export async function roleRoutes(
app: FastifyInstance,
): Promise<void> {

/* =====================================================
ROLES
===================================================== */

app.get(
"/roles",
async (
request,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);

  if (!userId) {
    return;
  }

  const roles = await getAllRoles();

  return reply.code(200).send({
    success: true,
    roles,
  });
},


);

app.get(
"/roles/:id",
async (
request: FastifyRequest<{
Params: {
id: string;
};
}>,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);

  if (!userId) {
    return;
  }

  const role =
    await getRoleById(
      request.params.id,
    );

  if (!role) {
    return reply.code(404).send({
      success: false,
      error: "ROLE_NOT_FOUND",
    });
  }

  return reply.code(200).send({
    success: true,
    role,
  });
},


);

app.post(
"/roles",
async (
request: FastifyRequest<{
Body: CreateRoleInput;
}>,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  try {
    const role =
      await createRole(
        request.body,
      );

    return reply.code(201).send({
      success: true,
      role,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      error: "ROLE_CREATION_FAILED",
    });
  }
},


);

/* =====================================================
PERMISSIONS
===================================================== */

app.get(
"/permissions",
async (
request,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  const permissions =
    await getAllPermissions();

  return reply.code(200).send({
    success: true,
    permissions,
  });
},


);

app.post(
"/permissions",
async (
request: FastifyRequest<{
Body: CreatePermissionInput;
}>,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  try {
    const permission =
      await createPermission(
        userId,
        request.body,
      );

    return reply.code(201).send({
      success: true,
      permission,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      error: "PERMISSION_CREATION_FAILED",
    });
  }
},


);

/* =====================================================
ROLE -> PERMISSION
===================================================== */

app.post(
"/roles/:roleId/permissions/:permissionId",
async (
request: FastifyRequest<{
Params: {
roleId: string;
permissionId: string;
};
}>,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  try {
    await assignPermissionToRole(
      request.params.roleId,
      request.params.permissionId,
    );

    return reply.code(200).send({
      success: true,
      message:
        "Permission assignée au rôle.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "ROLE_NOT_FOUND"
    ) {
      return reply.code(404).send({
        success: false,
        error: "ROLE_NOT_FOUND",
      });
    }

    if (
      error instanceof Error &&
      error.message ===
        "PERMISSION_NOT_FOUND"
    ) {
      return reply.code(404).send({
        success: false,
        error: "PERMISSION_NOT_FOUND",
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      error: "PERMISSION_ASSIGNMENT_FAILED",
    });
  }
},


);

app.get(
"/roles/:roleId/permissions",
async (
request: FastifyRequest<{
Params: {
roleId: string;
};
}>,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  const permissions =
    await getPermissionsForRole(
      request.params.roleId,
    );

  return reply.code(200).send({
    success: true,
    permissions,
  });
},


);

/* =====================================================
USER -> ROLES
===================================================== */

app.post(
"/users/:userId/roles/:roleId",
async (
request: FastifyRequest<{
Params: {
userId: string;
roleId: string;
};
}>,
reply,
) => {
const createdById =
requireAuthentication(
request,
reply,
);


  if (!createdById) {
    return;
  }

  try {
    const assignment =
      await assignRoleToUser(
        request.params.userId,
        request.params.roleId,
        null,
        createdById,
      );

    return reply.code(201).send({
      success: true,
      assignment,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "USER_NOT_FOUND"
    ) {
      return reply.code(404).send({
        success: false,
        error: "USER_NOT_FOUND",
      });
    }

    if (
      error instanceof Error &&
      error.message ===
        "ROLE_NOT_FOUND"
    ) {
      return reply.code(404).send({
        success: false,
        error: "ROLE_NOT_FOUND",
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      error: "ROLE_ASSIGNMENT_FAILED",
    });
  }
},


);

app.get(
"/users/:userId/roles",
async (
request: FastifyRequest<{
Params: {
userId: string;
};
}>,
reply,
) => {
const currentUserId =
requireAuthentication(
request,
reply,
);


  if (!currentUserId) {
    return;
  }

  const roles =
    await getUserRoles(
      request.params.userId,
    );

  return reply.code(200).send({
    success: true,
    roles,
  });
},


);

app.get(
"/users/:userId/permissions",
async (
request: FastifyRequest<{
Params: {
userId: string;
};
}>,
reply,
) => {
const currentUserId =
requireAuthentication(
request,
reply,
);


  if (!currentUserId) {
    return;
  }

  const permissions =
    await getUserPermissions(
      request.params.userId,
    );

  return reply.code(200).send({
    success: true,
    permissions,
  });
},


);

/* =====================================================
CURRENT USER
===================================================== */

app.get(
"/users/me/roles",
async (
request,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);

  if (!userId) {
    return;
  }

  const roles =
    await getUserRoles(userId);

  return reply.code(200).send({
    success: true,
    roles,
  });
},


);

app.get(
"/users/me/permissions",
async (
request,
reply,
) => {
const userId =
requireAuthentication(
request,
reply,
);


  if (!userId) {
    return;
  }

  const permissions =
    await getUserPermissions(userId);

  return reply.code(200).send({
    success: true,
    permissions,
  });
},


);
}

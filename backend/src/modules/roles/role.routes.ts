import type {
FastifyInstance,
FastifyReply,
FastifyRequest,
} from "fastify";

import { getActiveUserFromToken } from "../auth/auth.service.js";

import {
assignPermissionToRole,
assignRoleToUser,
createPermission,
createRole,
getAllPermissions,
getAllRoles,
getPermissionsForRole,
getRoleById,
hasPlatformAdministratorRole,
hasPlatformSuperadministratorRole,
getUserPermissions,
getUserRoles,
} from "./role.service.js";

import type {
CreatePermissionInput,
CreateRoleInput,
RoleName,
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

async function getAuthenticatedUserId(
request: FastifyRequest,
): Promise<string | null> {
const token = getTokenFromRequest(request);

if (!token) {
return null;
}

const user = await getActiveUserFromToken(token);
return user?.id ?? null;
}

async function requireAuthentication(
request: FastifyRequest,
reply: FastifyReply,
): Promise<string | null> {
const userId =
await getAuthenticatedUserId(request);

if (!userId) {
reply.code(401).send({
success: false,
error: "UNAUTHENTICATED",
});


return null;


}

return userId;
}

async function requireAdministrator(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<string | null> {
  const userId = await requireAuthentication(request, reply);

  if (!userId) {
    return null;
  }

  try {
    const isAdministrator = await hasPlatformAdministratorRole(userId);

    if (!isAdministrator) {
      reply.code(403).send({
        success: false,
        error: "FORBIDDEN",
      });
      return null;
    }

    return userId;
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({
      success: false,
      error: "AUTHORIZATION_CHECK_FAILED",
    });
    return null;
  }
}

async function requireSuperadministrator(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<string | null> {
  const userId = await requireAuthentication(request, reply);

  if (!userId) {
    return null;
  }

  try {
    const isSuperadministrator =
      await hasPlatformSuperadministratorRole(userId);

    if (!isSuperadministrator) {
      reply.code(403).send({
        success: false,
        error: "SUPERADMIN_REQUIRED",
      });
      return null;
    }

    return userId;
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({
      success: false,
      error: "AUTHORIZATION_CHECK_FAILED",
    });
    return null;
  }
}

function isElevatedRole(name: RoleName): boolean {
  return name === "ADMIN" || name === "SUPERADMIN";
}

async function requireAdministratorOrSelf(
  request: FastifyRequest,
  reply: FastifyReply,
  targetUserId: string,
): Promise<string | null> {
  const userId = await requireAuthentication(request, reply);

  if (!userId) {
    return null;
  }

  if (userId === targetUserId) {
    return userId;
  }

  try {
    const isAdministrator = await hasPlatformAdministratorRole(userId);

    if (!isAdministrator) {
      reply.code(403).send({
        success: false,
        error: "FORBIDDEN",
      });
      return null;
    }

    return userId;
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({
      success: false,
      error: "AUTHORIZATION_CHECK_FAILED",
    });
    return null;
  }
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
await requireAuthentication(
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
await requireAuthentication(
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
await requireAdministrator(
request,
reply,
);


  if (!userId) {
    return;
  }

  if (isElevatedRole(request.body.name)) {
    const superadministratorId = await requireSuperadministrator(
      request,
      reply,
    );

    if (!superadministratorId) {
      return;
    }
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
await requireAuthentication(
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
await requireAdministrator(
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
await requireAdministrator(
request,
reply,
);


  if (!userId) {
    return;
  }

  try {
    const role = await getRoleById(request.params.roleId);

    if (!role) {
      return reply.code(404).send({
        success: false,
        error: "ROLE_NOT_FOUND",
      });
    }

    if (isElevatedRole(role.name)) {
      const superadministratorId = await requireSuperadministrator(
        request,
        reply,
      );

      if (!superadministratorId) {
        return;
      }
    }

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
await requireAuthentication(
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
await requireAdministrator(
request,
reply,
);


  if (!createdById) {
    return;
  }

  try {
    const role = await getRoleById(request.params.roleId);

    if (!role) {
      return reply.code(404).send({
        success: false,
        error: "ROLE_NOT_FOUND",
      });
    }

    if (isElevatedRole(role.name)) {
      const superadministratorId = await requireSuperadministrator(
        request,
        reply,
      );

      if (!superadministratorId) {
        return;
      }
    }

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
await requireAdministratorOrSelf(
request,
reply,
request.params.userId,
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
await requireAdministratorOrSelf(
request,
reply,
request.params.userId,
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
await requireAuthentication(
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
await requireAuthentication(
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

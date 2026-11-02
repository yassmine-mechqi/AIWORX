import assert from "node:assert/strict";
import test from "node:test";

// The routes under test reject these requests before opening a database connection.
process.env["DATABASE_URL"] ??=
  "postgresql://postgres:postgres@127.0.0.1:5432/aiworx_test";
process.env["JWT_SECRET"] ??= "test-only-jwt-secret-not-for-production";
process.env["NODE_ENV"] = "test";

const { buildApp } = await import("../src/app/app.js");

test("registration rejects an invalid email", async (t) => {
  const app = buildApp();
  t.after(async () => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/auth/register",
    payload: {
      email: "not-an-email",
      password: "MotDePasseFort!123",
      firstName: "Test",
      lastName: "Validation",
    },
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, "FST_ERR_VALIDATION");
});

test("registration requires lastName", async (t) => {
  const app = buildApp();
  t.after(async () => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/auth/register",
    payload: {
      email: "validation.test@example.com",
      password: "MotDePasseFort!123",
      firstName: "Test",
    },
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, "FST_ERR_VALIDATION");
});

test("registration rejects passwords shorter than eight characters", async (t) => {
  const app = buildApp();
  t.after(async () => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/auth/register",
    payload: {
      email: "validation.short-password@example.com",
      password: "Ab1!",
      firstName: "Test",
      lastName: "Validation",
    },
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, "FST_ERR_VALIDATION");
});

test("registration rejects fields that are not allowed", async (t) => {
  const app = buildApp();
  t.after(async () => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/auth/register",
    payload: {
      email: "validation.extra@example.com",
      password: "MotDePasseFort!123",
      firstName: "Test",
      lastName: "Validation",
      isAdmin: true,
    },
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, "FST_ERR_VALIDATION");
});

test("reset-password rejects a token with the wrong format", async (t) => {
  const app = buildApp();
  t.after(async () => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/auth/reset-password",
    payload: {
      token: "abc",
      newPassword: "MotDePasseFort!123",
    },
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.json().code, "FST_ERR_VALIDATION");
});

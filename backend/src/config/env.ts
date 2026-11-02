import "dotenv/config";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  databaseUrl: getRequiredEnv("DATABASE_URL"),
  jwtSecret: getRequiredEnv("JWT_SECRET"),
  jwtExpiresIn: process.env["JWT_EXPIRES_IN"] ?? "1d",
  port: Number(process.env["PORT"] ?? 3000),
  host: process.env["HOST"] ?? "127.0.0.1",
  // Fail closed: without an explicit environment, never enable development-only behavior.
  nodeEnv: process.env["NODE_ENV"] ?? "production",
  resendApiKey: process.env["RESEND_API_KEY"],
  emailFrom: process.env["EMAIL_FROM"],
  apiBaseUrl: process.env["API_BASE_URL"] ?? `http://127.0.0.1:${process.env["PORT"] ?? 3000}`,
};

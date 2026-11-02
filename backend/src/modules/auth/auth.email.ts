import { env } from "../../config/env.js";

export async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<void> {
  if (!env.resendApiKey || !env.emailFrom) {
    if (env.nodeEnv !== "production") return;
    throw new Error("EMAIL_DELIVERY_NOT_CONFIGURED");
  }

  const verificationUrl = new URL("/auth/verify-email", env.apiBaseUrl);
  verificationUrl.searchParams.set("token", token);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.emailFrom,
      to: [email],
      subject: "Verify your AIWORX email address",
      text: `Verify your email address using this one-time link (valid for 24 hours): ${verificationUrl.toString()}`,
    }),
  });

  if (!response.ok) {
    throw new Error("EMAIL_DELIVERY_FAILED");
  }
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
): Promise<void> {
  if (!env.resendApiKey || !env.emailFrom) {
    if (env.nodeEnv !== "production") return;
    throw new Error("EMAIL_DELIVERY_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.emailFrom,
      to: [email],
      subject: "Reset your AIWORX password",
      text: `Use this one-time password reset token within 1 hour: ${token}`,
    }),
  });

  if (!response.ok) {
    throw new Error("EMAIL_DELIVERY_FAILED");
  }
}

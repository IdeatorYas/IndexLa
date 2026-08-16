import nodemailer from "nodemailer";

type SignupRole = "investor" | "creator";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT?.trim() || "465"),
    user: process.env.SMTP_USER?.trim() || "contact@indexla.tech",
    password: requireEnv("SMTP_PASSWORD"),
    from: process.env.SMTP_FROM?.trim() || "INDEXLA <contact@indexla.tech>",
  };
}

function confirmationCopy(role: SignupRole): { subject: string; text: string; html: string } {
  const roleLabel = role === "investor" ? "Investor" : "Creator";
  const subject = `INDEXLA Early Access Confirmation — ${roleLabel}`;
  const text = [
    `Thank you for joining INDEXLA early access as a ${roleLabel}.`,
    "",
    "Your email has been received and saved.",
    "We will follow up with next steps as early access opens.",
    "",
    "— INDEXLA",
    "https://indexla.tech",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.5;">
      <p>Thank you for joining INDEXLA early access as a <strong>${roleLabel}</strong>.</p>
      <p>Your email has been received and saved.</p>
      <p>We will follow up with next steps as early access opens.</p>
      <p style="margin-top: 24px;">— INDEXLA<br /><a href="https://indexla.tech">indexla.tech</a></p>
    </div>
  `.trim();

  return { subject, text, html };
}

export async function sendEarlyAccessConfirmation(
  to: string,
  role: SignupRole,
): Promise<void> {
  const smtp = getSmtpConfig();
  const copy = confirmationCopy(role);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: true,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
  });

  await transporter.sendMail({
    from: smtp.from,
    to,
    subject: copy.subject,
    text: copy.text,
    html: copy.html,
  });
}

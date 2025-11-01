import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration is incomplete. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.");
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });
}

export async function sendInternalEmail(
  subject: string,
  content: string
): Promise<void> {
  const notifyTo = process.env.NOTIFY_TO;
  const smtpUser = process.env.SMTP_USER;
  
  if (!notifyTo) {
    throw new Error("NOTIFY_TO environment variable is not set");
  }

  if (!smtpUser) {
    throw new Error("SMTP_USER environment variable is not set");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: smtpUser,
    to: notifyTo,
    subject,
    text: content,
  });
}


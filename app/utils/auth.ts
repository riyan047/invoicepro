import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import nodemailer from "nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const { host } = new URL(url);
        const brand = "InvoicePro";

        const transport = nodemailer.createTransport(provider.server);

        const html = `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Sign in to <strong>${brand}</strong></h2>
            <p>Click the button below to log in:</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Sign in
            </a>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">
              If you didn’t request this email, you can safely ignore it.
            </p>
          </div>
        `;

        const text = `Sign in to ${brand}\n${url}\n\nIf you didn't request this email, you can ignore it.`;

        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${brand}`,
          text,
          html,
        });
      },
    }),
  ],
  pages: {
    verifyRequest: "/verify",
  },
});

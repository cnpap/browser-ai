import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { getEnv } from "src/config/configuration";

export const auth = betterAuth({
  basePath: "/api/auth",
  plugins: [jwt()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  trustedOrigins: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
  ],
  socialProviders: {
    github: {
      clientId: getEnv("GITHUB_CLIENT_ID"),
      clientSecret: getEnv("GITHUB_CLIENT_SECRET"),
      redirectURI: `http://localhost:${getEnv(
        "PORT",
      )}/api/auth/callback/github`,
    },
  },
  hooks: {}, // Enable hooks for NestJS integration
});

import { Injectable } from "@nestjs/common";
import type { AuthHookContext } from "@thallesp/nestjs-better-auth";
import { AfterHook, Hook } from "@thallesp/nestjs-better-auth";
import { AuthGateway } from "./auth.gateway";

@Hook()
@Injectable()
export class LoginHook {
  constructor(private readonly authGateway: AuthGateway) {}

  // 在社交登录完成后的回调路由触发（此时才会创建新会话并设置 JWT）
  @AfterHook("/api/auth/callback/github")
  async handle(ctx: AuthHookContext) {
    const newSession = ctx.context.newSession;
    if (newSession) {
      // Get the JWT from the response headers
      const responseHeaders = ctx.context.responseHeaders;
      const jwt = responseHeaders?.get("set-auth-jwt");

      if (jwt) {
        // 通过 WebSocket 将 JWT 和新会话信息发送给前端
        this.authGateway.sendLoginSuccess(jwt, newSession);
      }
    }
  }
}

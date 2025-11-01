import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { Session } from "@thallesp/nestjs-better-auth";
import type { Response } from "express";
import { auth } from "./auth";

@Controller("api/auth") // Align with better-auth basePath
export class AuthController {
  // 暴露一个简单的会话查询接口，供前端获取当前登录用户会话信息
  @Get("session")
  getSession(@Session() session: unknown) {
    return session ?? null;
  }

  // 兼容 GET 入口：收到 provider 后，调用 better-auth 的 server API 并进行重定向到第三方登录页
  @Get("sign-in/social")
  async signInSocial(
    @Query("provider") provider: string,
    @Res() res: Response,
  ) {
    if (!provider) {
      return res.status(400).json({ error: "provider is required" });
    }
    const response = await auth.api.signInSocial({
      body: { provider },
      asResponse: true,
    });
    const location = response.headers.get("location");
    if (location) {
      return res.redirect(location);
    }
    const text = await response.text();
    return res.status(response.status).send(text);
  }

  // 更直观的路由：/api/auth/sign-in/:provider
  @Get("sign-in/:provider")
  async signInProvider(
    @Param("provider") provider: string,
    @Res() res: Response,
  ) {
    if (!provider) {
      return res.status(400).json({ error: "provider is required" });
    }
    const response = await auth.api.signInSocial({
      body: { provider },
      asResponse: true,
    });
    const location = response.headers.get("location");
    if (location) {
      return res.redirect(location);
    }
    const text = await response.text();
    return res.status(response.status).send(text);
  }
}

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthGateway } from "./auth.gateway";
import { LoginHook } from "./auth.hooks";

@Module({
  controllers: [AuthController],
  providers: [AuthGateway, LoginHook],
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule as NestAuthModule } from "@thallesp/nestjs-better-auth"; // Renamed to avoid conflict
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { auth } from "./auth/auth"; // Your better-auth config
import { AuthController as BetterAuthController } from "./auth/auth.controller";
import { AuthGateway } from "./auth/auth.gateway";
import { LoginHook } from "./auth/auth.hooks";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    NestAuthModule.forRoot({ auth }), // Integrate better-auth
  ],
  controllers: [AppController, BetterAuthController],
  providers: [AppService, AuthGateway, LoginHook],
})
export class AppModule {}

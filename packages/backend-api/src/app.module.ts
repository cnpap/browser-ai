import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // 使配置在整个应用中全局可用
      cache: true, // 缓存配置以提高性能
      expandVariables: true, // 支持环境变量展开
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

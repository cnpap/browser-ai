import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IoAdapter } from "@nestjs/platform-socket.io";
import type { OpenAPIObject } from "@nestjs/swagger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { getEnv } from "./config/configuration";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ["log", "error", "warn", "debug", "verbose"],
  });

  // 启用 CORS 以支持前端访问
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:4173",
      "http://127.0.0.1:4173",
    ], // 支持 localhost 和 127.0.0.1
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  // 配置 Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Browser AI API")
    .setDescription("Browser AI 测试接口文档")
    .setVersion("1.0")
    .addTag("test", "测试接口")
    .build();
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, documentFactory);

  // 使用新的环境变量获取函数获取端口号
  const port = getEnv("PORT");
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`,
    "Bootstrap",
  );
  Logger.log(
    `📚 Swagger UI is available at: http://localhost:${port}/api-docs`,
    "Bootstrap",
  );
}

void bootstrap();

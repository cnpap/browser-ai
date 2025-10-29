import "reflect-metadata";
import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export type BootstrapOptions = {
  preferredPort?: number; // 首选端口（默认 3000）
  host?: string; // 绑定主机（默认 127.0.0.1）
  cors?: {
    origin?:
      | true
      | string
      | RegExp
      | Array<string | RegExp>
      | ((
          origin: string | undefined,
          callback: (err: Error | null, allow?: boolean) => void,
        ) => void);
    credentials?: boolean;
  };
};

export type BootstrapResult = {
  app: INestApplication;
  port: number;
  host: string;
  baseUrl: string;
};

/**
 * 启动 Nest 应用，自动占用可用端口并返回最终端口与 baseUrl。
 */
export async function bootstrap(
  options: BootstrapOptions = {},
): Promise<BootstrapResult> {
  const host = options.host ?? "127.0.0.1";
  let port = options.preferredPort ?? 3000;

  const app = await NestFactory.create(AppModule);

  // 允许 Electron file://、Vite Dev/Preview 等任意来源，根据请求来源动态反射
  app.enableCors({
    origin: options.cors?.origin ?? true,
    credentials: options.cors?.credentials ?? true,
  });

  // 尝试在首选端口启动，不行则递增寻找可用端口
  // 为避免无限循环，限定最大尝试次数
  const maxAttempts = 50;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await app.listen(port, host);
      const baseUrl = `http://${host}:${port}`;
      return { app, port, host, baseUrl };
    } catch (err) {
      const error = err as Error & { code?: string };
      // 端口被占用则尝试下一个端口，否则抛出
      if (
        error &&
        (error.code === "EADDRINUSE" || error.message.includes("EADDRINUSE"))
      ) {
        port += 1;
        continue;
      }
      throw error;
    }
  }

  throw new Error(
    `Unable to start backend server: ports starting from ${options.preferredPort ?? 3000} are occupied (attempts=${maxAttempts}).`,
  );
}

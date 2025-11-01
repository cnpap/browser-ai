import { registerAs } from "@nestjs/config";
import { z } from "zod";

// 环境变量验证模式
export const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3999),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_BASE_URL: z.string().optional(),
  // OAuth / Better-Auth 相关配置
  GITHUB_CLIENT_ID: z.string().default(""),
  GITHUB_CLIENT_SECRET: z.string().default(""),
});

export type ConfigType = z.infer<typeof configSchema>;

// 验证环境变量
export function validateConfig(config: Record<string, unknown>): ConfigType {
  const result = configSchema.safeParse(config);

  if (!result.success) {
    throw new Error(
      `Configuration validation error: ${result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ")}`,
    );
  }

  return result.data;
}

// 缓存已验证的配置
let cachedConfig: ConfigType | null = null;

// 获取环境变量配置（基于 process.env）
export function getEnvConfig(): ConfigType {
  if (!cachedConfig) {
    cachedConfig = validateConfig(process.env);
  }
  return cachedConfig;
}

// 类型安全的环境变量获取函数
export function getEnv<K extends keyof ConfigType>(key: K): ConfigType[K] {
  const config = getEnvConfig();
  return config[key];
}

// 应用配置
export default registerAs("app", () => {
  return validateConfig(process.env);
});

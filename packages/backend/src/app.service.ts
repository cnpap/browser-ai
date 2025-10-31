import { exec } from "node:child_process";
import { promisify } from "node:util";
import { Injectable } from "@nestjs/common";

const execAsync = promisify(exec);

@Injectable()
export class AppService {
  getHello() {
    return "Hello World!";
  }

  async openUrl(url: string) {
    // 验证 URL 格式
    new URL(url);

    // 根据操作系统选择合适的命令
    let command: string;
    if (process.platform === "win32") {
      command = `start "" "${url}"`;
    } else if (process.platform === "darwin") {
      command = `open "${url}"`;
    } else {
      command = `xdg-open "${url}"`;
    }

    await execAsync(command);
    return { success: true };
  }
}

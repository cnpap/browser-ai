import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api";
import Layout from "../components/Layout";
import { authEvents, disconnect, socket } from "../socket";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [_isAuthenticated, setIsAuthenticated] = useState(false); // Simple state for demo; replace with actual auth check

  useEffect(() => {
    socket.connect();
    authEvents.loginSuccess((data: { jwt: string; session: unknown }) => {
      console.log("Login success received:", data);
      // Handle JWT: store in localStorage or context for session management
      localStorage.setItem("authToken", data.jwt);
      // 保存会话信息供首页读取（由后端回调 Hook 直接提供）
      try {
        localStorage.setItem("authSession", JSON.stringify(data.session));
      } catch {}
      setIsAuthenticated(true);
      navigate("/");
    });

    return () => {
      disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    // Check if already authenticated (e.g., from localStorage)
    if (localStorage.getItem("authToken")) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate]);

  const handleGitHubLogin = async () => {
    setIsLoggingIn(true);
    // 将会通过 electron 直接打开这个链接。
    // better-auth 使用 basePath "/api/auth"，这里提供更直观的入口：
    // "/api/auth/sign-in/<provider>"
    const githubLoginUrl = "http://localhost:3999/api/auth/sign-in/github";
    app.openUrl({ url: githubLoginUrl });
    // Note: Callback will trigger WebSocket event
  };

  return (
    <Layout showSidebar={false} showUserAvatar={false}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-[12rem]">
          {/* 应用标题 */}
          <div className="text-center">
            <Icon
              icon="solar:cpu-bolt-bold-duotone"
              className="text-5xl text-primary mx-auto mb-4"
            />
          </div>

          {/* 按钮区域 */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Button
                color={isLoggingIn ? "default" : "primary"}
                variant={isLoggingIn ? "flat" : "shadow"}
                className="w-full text-base font-medium"
                onPress={
                  isLoggingIn ? () => setIsLoggingIn(false) : handleGitHubLogin
                }
                startContent={
                  isLoggingIn && <Spinner size="sm" color="current" />
                }
              >
                {isLoggingIn ? "取消" : "使用 GitHub 登录"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

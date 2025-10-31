import { useAuth } from "@clerk/clerk-react";
import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api";
import Layout from "../components/Layout";

export default function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (!isCheckingAuth) return;
    const interval = setInterval(() => {
      if (isSignedIn) {
        setIsCheckingAuth(false);
        navigate("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isCheckingAuth, isSignedIn, navigate]);

  const handleLogin = async () => {
    setIsCheckingAuth(true);
    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const keyParts = publishableKey.split("_");
    const encodedDomain = keyParts[keyParts.length - 1];
    const clerkDomain = atob(encodedDomain)
      .replace(/\$$/, "")
      .replace(/\.clerk\.accounts\.dev$/, ".accounts.dev");

    const signInUrl = `https://${clerkDomain}/sign-in`;
    app.openUrl({ url: signInUrl });
  };

  if (!isLoaded) {
    return (
      <Layout showSidebar={false} showUserAvatar={false}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" color="primary" />
            <p className="text-default-500">正在初始化...</p>
          </div>
        </div>
      </Layout>
    );
  }

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

          {/* 固定的按钮区域 */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Button
                color={isCheckingAuth ? "default" : "primary"}
                variant={isCheckingAuth ? "flat" : "shadow"}
                className="w-full text-base font-medium"
                onPress={
                  isCheckingAuth ? () => setIsCheckingAuth(false) : handleLogin
                }
                startContent={
                  isCheckingAuth && <Spinner size="sm" color="current" />
                }
              >
                {isCheckingAuth ? "取消" : "登录"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

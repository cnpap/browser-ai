import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Divider,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api";
import Layout from "../components/Layout";

export default function Home() {
  const [count, setCount] = useState(0);
  const [hello, setHello] = useState<string | null>(null);
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    app
      .getHello()
      .then((res) => {
        setHello(String(res._data ?? ""));
        console.log("vtzac demo:", res._data);
      })
      .catch((err) => {
        console.error("vtzac demo error:", err);
      });
  }, []);

  // 检查登录状态，如果未登录则跳转到登录页面
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut();
  };

  // 如果认证状态未加载完成或用户未登录，显示加载状态
  if (!isLoaded || !isSignedIn) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" color="primary" />
            <p className="text-default-500">正在检查登录状态...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="bg-content1">
          <CardHeader className="flex flex-col items-start gap-2 p-4">
            <div className="flex w-full items-center justify-start">
              <div className="flex items-center gap-3">
                <Chip variant="flat" color="primary">
                  Electron
                </Chip>
                <Chip variant="flat" color="secondary">
                  Vite
                </Chip>
                <Chip variant="flat" color="success">
                  React
                </Chip>
                <Chip variant="flat" color="warning">
                  HeroUI
                </Chip>
              </div>
            </div>
            <h1 className="text-2xl font-semibold">Browser AI</h1>
            <p className="text-default-500">
              Modern base page rebuilt with Tailwind + HeroUI
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4 p-4">
            {/* 认证状态显示 */}
            <div className="space-y-2">
              <p className="text-small text-default-500">认证状态:</p>
              <div className="flex items-center gap-3">
                {isSignedIn ? (
                  <>
                    <Chip color="success" variant="flat">
                      已登录:{" "}
                      {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                    </Chip>
                    <Button size="sm" variant="flat" onPress={handleLogout}>
                      登出
                    </Button>
                  </>
                ) : (
                  <>
                    <Chip color="warning" variant="flat">
                      未登录
                    </Chip>
                    <Button size="sm" color="primary" onPress={handleLogin}>
                      登录
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Divider />

            <div className="flex items-center gap-3">
              <Button color="primary" onPress={() => setCount((c) => c + 1)}>
                Count is {count}
              </Button>
              <Button variant="flat" onPress={() => setCount(0)}>
                Reset
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-small text-default-500">
                Backend hello response:
              </p>
              <Code className="max-w-full overflow-auto" size="sm">
                {hello ?? "(loading...)"}
              </Code>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}

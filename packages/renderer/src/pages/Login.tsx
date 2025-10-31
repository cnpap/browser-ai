import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  // 使用 Clerk 的内置登录组件
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <SignIn routing="path" path="/login" />
    </div>
  );
}

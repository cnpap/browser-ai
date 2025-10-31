import { ClerkProvider } from "@clerk/clerk-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

// Clerk 集成：使用环境变量中的发布密钥
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

// 将 ClerkProvider 与 React Router 的导航能力绑定
export function ClerkProviderWithRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/login"
      signUpUrl="/login"
    >
      {children}
    </ClerkProvider>
  );
}

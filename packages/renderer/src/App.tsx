import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClerkProviderWithRouter } from "./auth/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRouter>
        <Routes>
          {/* 登录页 */}
          <Route path="/login/*" element={<Login />} />

          {/* 首页路由 - 允许直接访问 */}
          <Route path="/" element={<Home />} />

          {/* 兜底路由 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ClerkProviderWithRouter>
    </BrowserRouter>
  );
}

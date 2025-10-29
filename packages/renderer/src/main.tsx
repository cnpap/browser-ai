import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.tsx";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element '#root' not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </StrictMode>,
);

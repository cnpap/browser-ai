import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import vtzac from "vtzac";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vtzac(), react()],
});

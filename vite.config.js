import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  optimizeDeps: {
    include: ["@stripe/stripe-js"],
  },
  build: {
    outDir: "dist", // 确保与 Vercel 部署一致
  },
  server: {
    historyApiFallback: true, // 支持本地开发中的客户端路由
  },
});

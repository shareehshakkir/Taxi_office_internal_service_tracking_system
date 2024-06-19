import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@assets": path.resolve(__dirname, "./assets"),
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@driver": path.resolve(__dirname, "./src/driver"),
      "@admin": path.resolve(__dirname, "./src/admin"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@sections": path.resolve(__dirname, "./src/sections"),
    },
  },
});

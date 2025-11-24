import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001", // Tem que bater com o server.py
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
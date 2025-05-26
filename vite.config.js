import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/rossmann-web/',
  plugins: [react()],
  server: {
    proxy: {
      "/browser": {
        target: "http://localhost:1101",
        changeOrigin: true,
      },
    },
  

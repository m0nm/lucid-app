import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [react(), checker({ typescript: true })],
});
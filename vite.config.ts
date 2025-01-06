import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/metronic8/react/demo8/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    proxy: {
      "/shipdetails": {
        target: "http://localhost:8085", // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

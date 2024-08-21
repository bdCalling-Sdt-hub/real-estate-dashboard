import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "115.127.156.14", // Set the IP address
    port: 5173, // Set the port
  },
});

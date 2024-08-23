import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "159.223.184.53", // Set the IP address
    port: 5183, // Set the port
  },
});

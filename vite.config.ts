import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

 
export default defineConfig({
  plugins: [react()],
  // server: {
    // host: "159.223.184.53", // Set the IP address
    // host: "192.168.10.138",
    // port: 5183, // Set the port
  // },
});

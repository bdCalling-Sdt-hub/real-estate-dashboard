import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

 
export default defineConfig({
  plugins: [react()],
  server: {
    host: "115.127.156.14",  
    port: 5173, 
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 3000,
    open: true, // Optional: Automatically open the browser
    // Specify your custom HTML file for development
    index: 'path/to/your/custom/popup.html', // Change this to your custom HTML file
  },
  build: {
    rollupOptions: {
      input: 'path/to/your/custom/index.html', // Specify your custom HTML file here
    },
  },
});

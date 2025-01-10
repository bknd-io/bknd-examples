import { devServer } from "bknd/adapter/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tsconfigPaths(),
      devServer({
         entry: "./src/server.ts"
      })
   ]
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";

import liveReload from "vite-plugin-live-reload";

function moveOutputPlugin() {
  return {
    name: "move-output",
    enforce: "post",
    apply: "build",
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith("pages/")) {
          const newFileName = fileName.slice("pages/".length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

// 在 ESM 環境下手動定義 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  // base 的寫法:
  // base: '/Repository 的名稱/' -> 只在 build 時使用這個 base，dev 時還是用 '/'
  base: command === "build" ? "/TenTenPanda_React/" : "/",
  plugins: [
    react(), // ← 只加這行
  ],
  resolve: {
    alias: {
      // 設定 @ 指向 src 資料夾
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

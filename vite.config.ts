import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          mfeHeaderSidebar: `${env.VITE_MFE_URL || "https://mfe-header-sidebar.vercel.app"}/assets/remoteEntry.js`,
        },
        exposes: {
          "./sidebarStore": "./src/store/sidebarStore.ts",
          "./authStore": "./src/store/authStore.ts",
        },
        shared: ["react", "react-dom", "zustand", "react-router"],
      })
    ],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false
    },
    server: {
      host: true,
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
  }
})

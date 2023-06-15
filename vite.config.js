import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    hmr:true, //开启热更新
  },
  resolve: {
    alias: {
      "@":resolve(__dirname,"src"),
      "@c":resolve(__dirname,"src/components"),
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']

    
  }
})

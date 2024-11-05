import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    // alias:{
    //   "@assets":path.resolve(__dirname,"./assets"),
    // }
    alias:[
      {
        find:'@',replacement:path.resolve(__dirname,'src')
      }
    ],
    dedupe: ['react', 'react-dom'],
  },
  plugins: [react(),tsconfigPaths()],
})

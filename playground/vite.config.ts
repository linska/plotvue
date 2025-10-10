import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      plotvue: path.resolve(__dirname, '../src/main.ts')
    },
    dedupe: ['vue']
  }
})

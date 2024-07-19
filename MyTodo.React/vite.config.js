import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    // eslint-disable-next-line no-undef
    outDir: path.resolve(__dirname, '../MyTodo.Core/wwwroot'),
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'https://localhost:7250'
    }
  }
});

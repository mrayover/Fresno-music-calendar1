import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from 'vite-plugin-tailwind'

export default defineConfig({
  plugins: [
    react(),
    tailwind(), // 👈 injects Tailwind v4 support properly
  ],
})

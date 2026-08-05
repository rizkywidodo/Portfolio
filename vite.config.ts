import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the build works both at the interim
  // github.io/Portfolio/ subpath and, later, at the mrizkywidodo.com root.
  base: './',
})

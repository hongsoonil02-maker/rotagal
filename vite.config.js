import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 커스텀 도메인(rotagal.kr)과 github.io 하위경로 모두 지원하는 상대 경로
  plugins: [
    tailwindcss(),
    react()
  ],
})

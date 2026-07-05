import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rotagal/', // 깃허브 페이지스(rotagal 저장소) 전용 base 경로 설정
  plugins: [
    tailwindcss(),
    react()
  ],
})

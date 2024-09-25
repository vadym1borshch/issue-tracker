import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Або 'media' для автоматичної зміни теми залежно від системних налаштувань
  theme: {
    extend: {
      colors: {
        lightBackground: '#ffffff',
        darkBackground: '#1a202c',
        lightText: '#1a202c',
        darkText: '#f5f5f5',
        // Додайте більше кастомних кольорів для теми
      },
    },
  },
  plugins: [typography],
}
export default config

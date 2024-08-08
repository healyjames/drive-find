import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        light: '#F5933D',
        base: '#E8740C',
        dark: '#AE5609',
      },
      secondary: {
        light: '#264569',
        base: '#132335',
        dark: '#050A0F'
      }
    },
    extend: {},
  },
  plugins: [],
}

export default config

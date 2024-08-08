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
        light: '#5D6267',
        base: '#1A1D1F',
        dark: '#111315'
      }
    },
    extend: {},
  },
  plugins: [],
}

export default config

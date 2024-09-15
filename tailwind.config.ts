import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				light: '#5D6267',
  				base: '#1A1D1F',
  				dark: '#111315'
  			},
  			secondary: {
  				light: '#F5933D',
  				base: '#E8740C',
  				dark: '#AE5609'
  			},
  			grey: {
  				light: '#FFFFFF',
  				base: '#FAFAFA',
  				dark: '#EBEBEB'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

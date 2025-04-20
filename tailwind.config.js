/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4605', // Orange for racing/automotive theme
        secondary: '#1E293B', // Dark blue for contrast
        background: '#F8FAFC', // Light background
        dark: '#0F172A', // Very dark blue for text
        accent: '#3B82F6', // Blue accent
      },
    },
  },
  plugins: [],
} 
const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--mono), Arial',
      sans: 'var(--sans), Arial',
      serif: 'var(--serif)'
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

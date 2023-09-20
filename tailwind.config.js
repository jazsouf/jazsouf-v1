const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--mono)',
      sans: 'var(--sans)',
      serif: 'var(--serif)'
    },
    colors: {
      'p-color': '#3E2723',
      's-color': '#4D3027',
      'a-color': '#FFD700',
      'ah-color': '#B87333',
      't-color': '#F5F5F5',
      'l-color': '#E5E5C5',
      'lh-color': '#C5C5B5',
      'bt-color': '#8B0000',
      'lbt-color': '#5F0000',
      'b-color': '#CCCCCC'
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

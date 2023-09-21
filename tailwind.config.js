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
    },
    keyframes: {
      fadeIn: {
        '0%': {
          mask: 'linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 150% 0 / 400% no-repeat',
          opacity: '.2'
        },
        '100%': {
          mask: 'linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 0 / 400% no-repeat',
          opacity: '1'
        }
      },
      hardFadeIn: {
        '0%': { opacity: '0', filter: 'brightness(1)' },
        '10%': { opacity: '1', filter: 'brightness(2)' },
        '100%': { opacity: '1', filter: 'brightness(1)' }
      },
      smoothFadeIn: {
        '0%': {
          opacity: '0',
          clipPath: 'inset(5%)',
          transform: 'scale(111.11%)'
        },
        '100%': { opacity: '1', clipPath: 'inset(0)', transform: 'scale(1)' }
      }
    },
    animation: {
      'fade-in': 'fadeIn 1s ease-in-out',
      'hard-fade-in': 'hardFadeIn 1s ease-in-out',
      'smooth-fade-in': 'smoothFadeIn 1s ease-in-out'
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

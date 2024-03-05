import localFont from 'next/font/local'

export const mono = localFont({
  src: [
    {
      path: './JetBrainsMono-VariableFont_wght.ttf',
    },
  ],
  display: 'swap',
  adjustFontFallback: 'Arial',
  variable: '--mono',
  preload: true,
  fallback: ['courrier sans', 'mono'],
})

export const serif = localFont({
  src: [
    {
      path: './Satoshi-Variable.ttf',
    },
  ],
  display: 'swap',
  adjustFontFallback: 'Arial',
  variable: '--serif',
  preload: true,
  fallback: ['Arial', 'arial', 'system-ui'],
})

export const sans = localFont({
  src: [
    {
      path: './Satoshi-Variable.ttf',
    },
  ],
  display: 'swap',
  adjustFontFallback: 'Arial',
  variable: '--sans',
  preload: true,
  fallback: ['Arial', 'arial', 'system-ui'],
})

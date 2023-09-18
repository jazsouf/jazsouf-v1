import localFont from 'next/font/local'

export const mono = localFont({
  src: [
    {
      path: './JetBrainsMono-VariableFont_wght.ttf',
      weight: '100'
    },
    {
      path: './JetBrainsMono-VariableFont_wght.ttf',
      weight: '400'
    },
    {
      path: './JetBrainsMono-VariableFont_wght.ttf',
      weight: '700'
    }
  ],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--mono',
  preload: true,
  fallback: ['courrier sans', 'mono']
})

export const sans = localFont({
  src: [
    {
      path: './Lena.ttf',
      weight: '100'
    },
    {
      path: './Lena.ttf',
      weight: '400'
    },
    {
      path: './Lena.ttf',
      weight: '700'
    }
  ],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--sans',
  preload: true,
  fallback: ['system ui', 'arial']
})

export const serif = localFont({
  src: [
    {
      path: './LeagueSpartan-VariableFont_wght.ttf',
      weight: '100'
    },
    {
      path: './LeagueSpartan-VariableFont_wght.ttf',
      weight: '400'
    },
    { path: './LeagueSpartan-VariableFont_wght.ttf', weight: '700' }
  ],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--serif',
  preload: true,
  fallback: ['system-ui', 'arial']
})

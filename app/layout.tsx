import 'tailwindcss/tailwind.css'

import { mono, sans, serif } from 'fonts/_font'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} bg-s-color`}
    >
      <body>{children}</body>
    </html>
  )
}

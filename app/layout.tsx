import 'tailwindcss/tailwind.css'

import { mono, sans, serif } from 'fonts/font'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} bg-p-color`}
    >
      <body>{children}</body>
    </html>
  )
}

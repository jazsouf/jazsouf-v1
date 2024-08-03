import "tailwindcss/tailwind.css";

import { mono } from "fonts/_font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} bg-s-color`}>
      <body>{children}</body>
    </html>
  );
}

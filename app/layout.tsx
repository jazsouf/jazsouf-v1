import "tailwindcss/tailwind.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-s-color">
      <body>{children}</body>
    </html>
  );
}

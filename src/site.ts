export type Span = { text: string; href?: string };

export const site = {
  title: "Soufiane",
  description: "Soufiane El Jazouli — Tech @parc.",
  url: "https://soufianee.com",
  ogImage: "/og.png",
  name: { main: "Soufiane", sub: "jazouli" },
  tagline: "Make beautiful things that speak to people",
  copyright: "© 2025 – Soufiane El Jazouli",
};

export const hero: Span[][] = [
  [
    { text: "Tech " },
    { text: "@parc", href: "https://parc.studio" },
    { text: "." },
  ],
  [
    { text: "Reach out - " },
    { text: "soufiane@parc.studio", href: "mailto:soufiane@parc.studio" },
  ],
];

export const footerLinks: Span[] = [
  { text: "email", href: "mailto:soufiane@parc.studio" },
  { text: "github", href: "https://github.com/jazsouf" },
  { text: "bsky", href: "https://bsky.app/profile/jazsouf.bsky.social" },
];

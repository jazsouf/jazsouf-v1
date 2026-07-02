export type Span = { text: string; href?: string };

export const site = {
  title: "Soufiane",
  description: "Soufiane El Jazouli — Technology at parc.",
  url: "https://soufianee.com",
  ogImage: "/og.png",
  name: "soufiane el jazouli",
  tagline: "make things with care.",
};

export const hero: Span[][] = [
  [
    { text: "technology at " },
    { text: "parc", href: "https://parc.studio" },
    { text: "." },
  ],
  [
    { text: "reach out; " },
    { text: "soufiane@parc.studio", href: "mailto:soufiane@parc.studio" },
  ],
];

export const footerLinks: Span[] = [
  { text: "are.na", href: "https://www.are.na/soufiane-el-jazouli/" },
  { text: "github", href: "https://github.com/jazsouf" },
  { text: "bsky", href: "https://bsky.app/profile/jazsouf.bsky.social" },
  { text: "instagram", href: "https://www.instagram.com/sfnejzl/" },
];

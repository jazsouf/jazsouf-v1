export type Span = { text: string; href?: string };

export const site = {
  title: "Soufiane",
  description: "Soufiane El Jazouli — Tech at parc.",
  url: "https://soufianee.com",
  ogImage: "/og.png",
  name: "soufiane el jazouli",
  tagline: "Make things with care.",
};

export const hero: Span[][] = [
  [
    { text: "Tech at " },
    { text: "parc", href: "https://parc.studio" },
    { text: "." },
  ],
  [
    { text: "Reach out - " },
    { text: "soufiane@parc.studio", href: "mailto:soufiane@parc.studio" },
  ],
];

export const footerLinks: Span[] = [
  { text: "are.na", href: "https://www.are.na/soufiane-el-jazouli/" },
  { text: "github", href: "https://github.com/jazsouf" },
  { text: "bsky", href: "https://bsky.app/profile/jazsouf.bsky.social" },
  { text: "instagram", href: "https://www.instagram.com/sfnejzl/" },
];

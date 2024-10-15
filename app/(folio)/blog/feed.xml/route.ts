import assert from "node:assert";
import { getPostsForFeed } from "@/sanity-cms/fetch";
import { urlFor } from "@/sanity-cms/image";
import { Feed } from "feed";

export async function GET(req: Request) {
  let siteUrl = new URL(req.url).origin;

  let feed = new Feed({
    title: "Soufiane's Writing Log",
    description: "Read about my life, my work and other stuff.",
    author: {
      name: "Soufiane El Jazouli",
      email: "jazsouf@pm.me",
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  let posts = await getPostsForFeed();

  for (let post of posts) {
    try {
      assert(typeof post.title === "string");
      assert(typeof post.slug === "string");
      assert(typeof post.excerpt === "string");
      assert(typeof post.publishedAt === "string");
    } catch (error) {
      console.log("Post is missing required fields for RSS feed:", post);
      return;
    }

    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${siteUrl}/blog/${post.slug}`,
      content: post.excerpt,
      image: post.mainImage
        ? urlFor(post.mainImage).size(1200, 800).format("jpg").url().replaceAll("&", "&amp;")
        : undefined,
      author: post.author?.name ? [{ name: post.author.name }] : [],
      contributor: post.author?.name ? [{ name: post.author.name }] : [],
      date: new Date(post.publishedAt),
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "content-type": "application/xml",
      "cache-control": "s-maxage=31556952",
    },
  });
}

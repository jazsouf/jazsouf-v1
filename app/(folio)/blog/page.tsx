import { getCategories, getFeaturedPosts, getPosts, getPostsCount } from "@/sanity-cms/fetch";
import { urlFor } from "@/sanity-cms/image";
import { ChevronLeft, ChevronRight, Rss } from "lucide-react";

import { clsx } from "clsx";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Writing log",
  description: "Read about my life, my work and other stuff.",
};

const POSTS_PER_PAGE = 5;

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page =
    "page" in searchParams
      ? typeof searchParams.page === "string" && Number.parseInt(searchParams.page) > 1
        ? Number.parseInt(searchParams.page)
        : notFound()
      : 1;

  let category = typeof searchParams.category === "string" ? searchParams.category : undefined;

  return (
    <main className="px-6 md:px-[20%] overflow-hidden relative flex w-full flex-col justify-between p-3 xl:pt-0">
      <div className="max-w-3xl">
        <h2 className="mt-24 text-sm font-extrabold md:text-lg">Writings Log</h2>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Life of me</h1>
        <p className="mt-6 max-w-3xl text-t-color">Posts about life, work, and stuff.</p>
      </div>
      {page === 1 && !category && <FeaturedPosts />}
      <div className="flex flex-col mx-1 max-w-3xl mt-16 pb-24">
        <Categories selected={category} />
        <Posts page={page} category={category} />
        <Pagination page={page} category={category} />
      </div>
    </main>
  );
}

async function FeaturedPosts() {
  let featuredPosts = await getFeaturedPosts(3);

  if (featuredPosts.length === 0) {
    return;
  }

  return (
    <div className="mt-16 pb-14">
      <div className="container">
        <div className="mx-auto max-w-3xl lg:max-w-7xl">
          <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <div
                key={post.slug}
                className="relative flex flex-col bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5"
              >
                {post.mainImage && (
                  <img
                    alt={post.mainImage.alt || ""}
                    src={urlFor(post.mainImage).size(1170, 780).url()}
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-8">
                  <div className="text-sm/5 text-gray-700">
                    {dayjs(post.publishedAt).format("dddd, MMMM D, YYYY")}
                  </div>
                  <div className="mt-2 text-base/7 font-medium">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </div>
                  <div className="mt-2 flex-1 text-sm/6 text-gray-500">{post.excerpt}</div>
                  {post.author && (
                    <div className="mt-6 flex items-center gap-3">
                      {post.author.image && (
                        <img
                          alt=""
                          src={urlFor(post.author.image).size(64, 64).url()}
                          className="aspect-square size-6 rounded-full object-cover"
                        />
                      )}
                      <div className="text-sm/5 text-gray-700">{post.author.name}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

async function Categories({ selected }: { selected?: string }) {
  let categories = await getCategories();

  if (categories.length === 0) {
    return;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <a
        type="button"
        href="/blog/feed.xml"
        className={clsx(
          "inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]",
          "border border-transparent shadow ring-1 ring-black/10",
          "whitespace-nowrap text-sm font-medium text-gray-950",
          "data-[disabled]:bg-transparent data-[hover]:bg-gray-50 data-[disabled]:opacity-40",
          "gap-1",
        )}
      >
        <Rss className="size-4" />
        RSS Feed
      </a>
    </div>
  );
}

async function Posts({ page, category }: { page: number; category?: string }) {
  let posts = await getPosts((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE, category);

  if (posts.length === 0 && (page > 1 || category)) {
    notFound();
  }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="mt-6">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="relative grid grid-cols-1 py-10 first:border-t max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            {post?.categories && (
              <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium flex pb-1.5 gap-1.5">
                {post.categories.map((category) => (
                  <div
                    key={category.slug}
                    className="border border-dotted border-gray-200 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.publishedAt).format("MMM YYYY")}
            </div>
            {post.author && (
              <div className="mt-2.5 flex items-center gap-3">
                {post.author.image && (
                  <img
                    alt=""
                    src={urlFor(post.author.image).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">{post.author.name}</div>
              </div>
            )}
          </div>
          <Link href={`/blog/${post.slug}`} className="sm:col-span-2">
            <h2 className="font-medium leading-relaxed">{post.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-700">{post.excerpt}</p>
            <div className="mt-4">
              <div className="flex items-center gap-1 text-sm/5 font-medium">
                <span className="absolute inset-0" />
                Read more
                <ChevronRight className="size-3 text-b-color" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

async function Pagination({
  page,
  category,
}: {
  page: number;
  category?: string;
}) {
  function url(page: number) {
    let params = new URLSearchParams();

    if (category) params.set("category", category);
    if (page > 1) params.set("page", page.toString());

    return params.size !== 0 ? `/blog?${params.toString()}` : "/blog";
  }

  let totalPosts = await getPostsCount(category);
  let hasPreviousPage = page - 1;
  let previousPageUrl = hasPreviousPage ? url(page - 1) : "";
  let hasNextPage = page * POSTS_PER_PAGE < totalPosts;
  let nextPageUrl = hasNextPage ? url(page + 1) : "";
  let pageCount = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (pageCount < 2) {
    return;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Link href={previousPageUrl}>
        <ChevronLeft className="size-4" />
        Previous
      </Link>
      <div className="flex gap-2 max-sm:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i + 1}
            href={url(i + 1)}
            data-active={i + 1 === page ? true : undefined}
            className={clsx(
              "size-7 text-center text-sm/7 font-medium",
              "data-[hover]:bg-gray-100",
              "data-[active]:shadow data-[active]:ring-1 data-[active]:ring-black/10",
              "data-[active]:data-[hover]:bg-gray-50",
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <Link href={nextPageUrl}>
        Next
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}

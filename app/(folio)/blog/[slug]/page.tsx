import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import { getPost } from "@/sanity-cms/fetch";
import { urlFor } from "@/sanity-cms/image";
import dayjs from "dayjs";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let { data: post } = await getPost((await params).slug, { stega: false });

  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPost({ params }: PageProps) {
  let { data: post } = await getPost((await params).slug, {});
  if (!post) {
    notFound();
  }

  return (
    <main className="overflow-hidden px-6 md:px-[20%] mt-16">
      <div className="max-w-3xl">
        <Link href="/blog" className="mt-10 flex gap-1.5 items-center">
          <ChevronLeft className="size-3" />
          Back to index
        </Link>
        <h2 className="mt-24 text-sm font-light md:text-lg">
          {dayjs(post?.publishedAt).format("MMMM D, YYYY")}
        </h2>
        <h1 className="mt-2 text-2xl font-medium md:text-3xl">{post.title}</h1>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <img
                    alt="author's avatar"
                    src={urlFor(post.author.image).size(64, 64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">{post.author.name}</div>
              </div>
            )}
            {Array.isArray(post.categories) && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog?category=${category.slug}`}
                    className="border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="text-gray-700">
            <div className="max-w-3xl xl:mx-auto">
              {post.mainImage && (
                <img
                  alt={post.mainImage.alt || ""}
                  src={urlFor(post.mainImage).size(2016, 1344).url()}
                  className="mb-10 aspect-[3/2] w-full object-cover shadow-xl"
                />
              )}
              {post.body && (
                <CustomPortableText
                  paragraphClasses="my-10 text-base/8 first:mt-0 last:mb-0"
                  value={post.body}
                />
              )}
              <Link href="/blog" className="mt-10 flex gap-1.5 items-center">
                <ChevronLeft className="size-3" />
                Back to index
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

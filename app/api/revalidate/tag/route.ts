import { revalidateTag } from "next/cache";
import { startTransition } from "react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const secret = searchParams.get("secret");
  console.log(secret, process.env.SANITY_REVALIDATE_SECRET, tag);
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }
  if (!tag) return new Response("Missing tag", { status: 400 });
  console.log("revalidate tag route handler:", tag);
  startTransition(() => {
    revalidateTag(tag);
  });

  return new Response(`Revalidated ${tag}`, { status: 200 });
}

import { revalidateTag } from "next/cache";
import { startTransition } from "react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const secret = searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }
  if (!tag) return new Response("Missing tag", { status: 400 });

  startTransition(() => {
    console.log("revalidate tag route handler:", tag);
    revalidateTag(tag);
  });

  return new Response(`Revalidated ${tag}`, { status: 200 });
}

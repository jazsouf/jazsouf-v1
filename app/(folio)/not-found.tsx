import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-content-center h-screen gap-14 p-12 pb-32 sm:p-20 md:px-[20%]">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="border border-a-color hover:bg-ah-color px-1.5 py-0.5 text-t-color">
        Return Home
      </Link>
    </div>
  );
}

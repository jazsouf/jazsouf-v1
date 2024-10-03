"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  function handleReset() {
    startTransition(() => {
      reset();
      router.refresh();
    });
  }

  return (
    <div className="grid place-content-center h-screen gap-14 p-12 pb-32 sm:p-20 md:px-[20%]">
      <p>An error occurred: {error.message}</p>
      <p>
        <button
          type="reset"
          onClick={handleReset}
          className="border border-b-color hover:bg-ah-color px-1.5 py-0.5 text-t-color"
        >
          Reset
        </button>
      </p>
    </div>
  );
}

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
    <div className="flex flex-col items-center justify-center gap-24 p-12 pb-32 sm:p-20 md:px-[12.5%]">
      <p>Error: {error.digest}</p>
      <p>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </p>
    </div>
  );
}

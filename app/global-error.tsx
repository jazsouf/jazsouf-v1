"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex bg-p-color flex-col items-center justify-center gap-24 p-12 pb-32 sm:p-20 md:px-[12.5%]">
        <h2>Something went wrong!</h2>
        <button type="reset" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}

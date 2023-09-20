/* eslint-disable @next/next/no-html-link-for-pages */

export function PreviewBanner() {
  return (
    <div className="bg-[#020304] p-3 text-center text-[#F8FAF5]">
      {'Previewing drafts. '}
      <a
        className="underline transition hover:opacity-50"
        href="/api/disable-draft"
      >
        Back to published
      </a>
    </div>
  )
}

/* eslint-disable @next/next/no-html-link-for-pages */

export function PreviewBanner() {
  return (
    <div className="bg-s-color text-t-color p-3 text-center">
      {'Previewing drafts. '}
      <a
        className="hover:text-lh-color underline transition"
        href="/api/disable-draft"
      >
        Back to published
      </a>
    </div>
  )
}

import 'styles/index.css'

import { FooterComponent } from 'components/global/FooterComponent'
import { NavbarComponent } from 'components/global/NavbarComponent'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { token } from 'lib/sanity.fetch'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const PreviewProvider = dynamic(
  () => import('components/preview/PreviewProvider')
)

export default async function IndexRoute({
  children
}: {
  children: React.ReactNode
}) {
  const isDraftMode = draftMode().isEnabled

  const layout = (
    <div className="flex min-h-screen flex-col bg-[#281A14] text-white ">
      {isDraftMode && <PreviewBanner />}
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <NavbarComponent />
      </Suspense>
      <div className="mt-24 flex-grow px-4 md:px-16 lg:px-32">
        <Suspense>{children}</Suspense>
      </div>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <FooterComponent />
      </Suspense>
    </div>
  )

  if (isDraftMode) {
    return <PreviewProvider token={token!}>{layout}</PreviewProvider>
  }

  return layout
}

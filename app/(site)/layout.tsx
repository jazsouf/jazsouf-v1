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
    <div className="bg-p-color text-t-color flex min-h-screen flex-col ">
      {isDraftMode && <PreviewBanner />}
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <NavbarComponent />
      </Suspense>
      <div className="flex-grow px-4 pt-14 md:px-16 lg:px-32">
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

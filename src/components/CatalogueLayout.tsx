import type { ReactNode } from 'react'
import Header from './Header.tsx'

type CatalogueLayoutProps = {
  section: string
  title: string
  description: string
  children: ReactNode
}

function CatalogueLayout({ section, title, description, children }: CatalogueLayoutProps) {
  return (
    <>
      <Header section={section} />
      <main className="page-grid pt-53 pb-6">
        <div className="sticky top-67.5 col-span-6 self-start">
          <h1 className="font-title text-title whitespace-pre-line">{title}</h1>
          <p className="mt-8 max-w-[448px]">{description}</p>
        </div>
        <div className="col-start-7 col-span-6 -ml-3 flex flex-col gap-8">{children}</div>
      </main>
    </>
  )
}

export default CatalogueLayout

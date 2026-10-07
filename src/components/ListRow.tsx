import type { ReactNode } from 'react'

type ListRowProps = {
  href: string
  children: ReactNode
}

function ListRow({ href, children }: ListRowProps) {
  return (
    <a href={href} className="flex h-8 items-center gap-4 border-b border-ink">
      {children}
    </a>
  )
}

export default ListRow

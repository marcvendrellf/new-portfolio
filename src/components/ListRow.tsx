import type { ReactNode } from 'react'

type ListRowProps = {
  href?: string
  target?: '_blank'
  children: ReactNode
}

const rowClassName = 'flex h-8 items-center gap-4 border-b border-ink'

function ListRow({ href, target, children }: ListRowProps) {
  if (href === undefined) {
    return (
      <li>
        <div className={rowClassName}>{children}</div>
      </li>
    )
  }

  return (
    <li>
      <a href={href} target={target} className={rowClassName}>
        {children}
      </a>
    </li>
  )
}

export default ListRow

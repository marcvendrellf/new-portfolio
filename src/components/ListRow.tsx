import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ListRowProps = {
  href?: string
  target?: '_blank'
  action?: ReactNode
  children: ReactNode
}

const rowClassName = 'flex h-8 items-center gap-4 border-b border-ink'

function ListRow({ href, target, action, children }: ListRowProps) {
  if (href === undefined) {
    return (
      <li>
        <div className={rowClassName}>{children}</div>
      </li>
    )
  }

  return (
    <li className="relative">
      <Link to={href} target={target} className={rowClassName}>
        {children}
      </Link>
      {action !== undefined && (
        <div className="absolute top-0 right-8">{action}</div>
      )}
    </li>
  )
}

export default ListRow

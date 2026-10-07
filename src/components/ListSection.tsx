import type { ReactNode } from 'react'

type ListSectionProps = {
  title: string
  children: ReactNode
}

function ListSection({ title, children }: ListSectionProps) {
  return (
    <section>
      <h2 className="pb-3 font-bold">{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}

export default ListSection

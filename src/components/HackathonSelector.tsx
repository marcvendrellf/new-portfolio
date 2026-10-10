import { Link } from 'react-router'
import { hackathons } from '../content/hackathons.ts'
import { sections } from '../content/sections.ts'

type HackathonSelectorProps = {
  currentId: string
}

function HackathonSelector({ currentId }: HackathonSelectorProps) {
  return (
    <nav aria-label={sections.hackathons.label}>
      <h2 className="pb-4">{sections.hackathons.label}</h2>
      <ul className="border-t border-ink">
        {hackathons.map((hackathon, index) => {
          const isCurrent = hackathon.id === currentId
          const number = String(index + 1).padStart(2, '0')
          const opacity = isCurrent ? 'opacity-100' : 'opacity-50'

          return (
            <li key={hackathon.id} className="border-b border-ink">
              <Link
                to={`${sections.hackathons.href}/${hackathon.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`flex h-8 items-center gap-3 px-2 ${opacity}`}
              >
                <span className="w-6">{number}</span>
                <span className="flex-1">{hackathon.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default HackathonSelector

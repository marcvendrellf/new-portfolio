import { Link } from 'react-router'
import { sections } from '../content/sections.ts'

function Navbar() {
  return (
    <nav aria-label="Main" className="flex gap-8">
      {Object.values(sections).map((section) => (
        <Link key={section.href} className="whitespace-nowrap" to={section.href}>
          {section.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar

import { sections } from '../content/sections.ts'

function Navbar() {
  return (
    <nav aria-label="Main" className="flex gap-6">
      {Object.values(sections).map((section) => (
        <a key={section.href} className="whitespace-nowrap" href={section.href}>
          {section.label}
        </a>
      ))}
    </nav>
  )
}

export default Navbar

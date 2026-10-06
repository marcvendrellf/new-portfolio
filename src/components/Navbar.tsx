const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'Hackathons', href: '/hackathons' },
  { label: 'About', href: '/about' },
  { label: 'AI Stack', href: '/ai-stack' },
  { label: 'Directory', href: '/directory' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  return (
    <nav aria-label="Main" className="flex gap-6">
      {links.map((link) => (
        <a key={link.href} className="whitespace-nowrap" href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Navbar

import { Link } from 'react-router'
import Navbar from './Navbar.tsx'

type HeaderProps = {
  section: string
}

function Header({ section }: HeaderProps) {
  return (
    <header className="page-grid sticky top-0 z-10 bg-paper pt-9.5">
      <nav aria-label="Breadcrumb" className="col-span-3 flex gap-2 whitespace-nowrap">
        <Link to="/">Marc Vendrell</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{section}</span>
      </nav>
      <div className="col-start-4 col-span-6 justify-self-center">
        <Navbar />
      </div>
    </header>
  )
}

export default Header

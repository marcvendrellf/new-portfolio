import Navbar from './Navbar.tsx'

type HeaderProps = {
  section: string
}

function Header({ section }: HeaderProps) {
  return (
    <header className="grid grid-cols-12 gap-x-6 px-6 pt-[38px]">
      <nav aria-label="Breadcrumb" className="col-span-6 flex gap-2 whitespace-nowrap">
        <a href="/">Marc Vendrell</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{section}</span>
      </nav>
      <div className="col-start-7 col-span-6">
        <Navbar />
      </div>
    </header>
  )
}

export default Header

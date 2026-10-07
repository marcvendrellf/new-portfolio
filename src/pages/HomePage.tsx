import Navbar from '../components/Navbar.tsx'

function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-10">
      <h1 className="font-title text-hero whitespace-nowrap">Marc Vendrell</h1>
      <Navbar />
    </main>
  )
}

export default HomePage

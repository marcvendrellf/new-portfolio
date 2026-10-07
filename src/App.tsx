import { sections } from './content/sections.ts'
import useSmoothScroll from './hooks/useSmoothScroll.ts'
import AboutPage from './pages/AboutPage.tsx'
import AiStackPage from './pages/AiStackPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import DirectoryPage from './pages/DirectoryPage.tsx'
import HomePage from './pages/HomePage.tsx'

function pageForPath(path: string) {
  switch (path) {
    case sections.about.href:
      return <AboutPage />
    case sections.aiStack.href:
      return <AiStackPage />
    case sections.directory.href:
      return <DirectoryPage />
    case sections.contact.href:
      return <ContactPage />
    default:
      return <HomePage />
  }
}

function App() {
  useSmoothScroll()

  return pageForPath(window.location.pathname)
}

export default App

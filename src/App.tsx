import { Route, Routes } from 'react-router'
import { sections } from './content/sections.ts'
import useSmoothScroll from './hooks/useSmoothScroll.ts'
import AboutPage from './pages/AboutPage.tsx'
import AiStackPage from './pages/AiStackPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import DirectoryPage from './pages/DirectoryPage.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  useSmoothScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={sections.about.href} element={<AboutPage />} />
      <Route path={sections.aiStack.href} element={<AiStackPage />} />
      <Route path={sections.directory.href} element={<DirectoryPage />} />
      <Route path={sections.contact.href} element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App

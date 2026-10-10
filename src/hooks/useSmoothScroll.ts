import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // A new page starts at the top. On back and forward, and on the first load, the type is
  // POP, and the browser restores the previous position itself.
  useEffect(() => {
    if (navigationType === 'POP') {
      return
    }

    if (lenisRef.current === null) {
      window.scrollTo(0, 0)
      return
    }

    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname, navigationType])
}

export default useSmoothScroll

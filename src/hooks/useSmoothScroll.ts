import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()

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

  useEffect(() => {
    if (lenisRef.current === null) {
      window.scrollTo(0, 0)
      return
    }

    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname])
}

export default useSmoothScroll

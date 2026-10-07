import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect } from 'react'

function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}

export default useSmoothScroll

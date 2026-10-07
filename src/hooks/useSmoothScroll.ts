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
      // Each frame moves 10% of the remaining distance. https://github.com/darkroomengineering/lenis
      lerp: 0.1,
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}

export default useSmoothScroll

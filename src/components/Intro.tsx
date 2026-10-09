import { useEffect, useRef, useState } from 'react'
import {
  bracketGap,
  bracketState,
  buildEvents,
  ease,
  progress,
  timing,
} from '../lib/introMotion.ts'

const storageKey = 'intro-played'

// The intro plays once per browser tab, only when the first page is Home,
// and never when the system asks for reduced motion.
function shouldPlay() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const firstTime = sessionStorage.getItem(storageKey) === null
  return window.location.pathname === '/' && firstTime && !reducedMotion
}

// Move an element with transform only, so the browser does not calculate the layout again.
function place(element: HTMLElement, x: number, y: number, opacity = 1) {
  element.style.transform = `translate(${x}px, ${y}px)`
  element.style.opacity = String(opacity)
}

function setText(element: HTMLElement, text: string) {
  if (element.textContent !== text) {
    element.textContent = text
  }
}

const part = 'absolute top-0 left-0 whitespace-pre opacity-0'

function Intro() {
  const [playing, setPlaying] = useState(shouldPlay)
  const overlayRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLSpanElement>(null)
  const rightRef = useRef<HTMLSpanElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const oldWordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const left = leftRef.current
    const right = rightRef.current
    const word = wordRef.current
    const oldWord = oldWordRef.current
    if (!overlay || !left || !right || !word || !oldWord) {
      return
    }

    sessionStorage.setItem(storageKey, 'yes')
    let frameId = 0
    let stopped = false

    // Arrow functions, so TypeScript keeps the null check above inside them.
    const start = () => {
      // Measure each text in the word element before the first frame.
      const events = buildEvents((text) => {
        word.textContent = text
        return word.offsetWidth
      })
      const nameStart = events[events.length - 1].time
      const [leaveStart, leaveEnd] = timing.leave.map((offset) => nameStart + offset)
      const bracketWidth = left.offsetWidth
      const lineHeight = word.offsetHeight
      const startTime = performance.now()

      const draw = (now: number) => {
        const t = (now - startTime) / 1000
        const state = bracketState(events, t)
        const centerX = window.innerWidth / 2
        const top = (window.innerHeight - lineHeight) / 2

        // The brackets fade in, and they touch each other when the frame is empty.
        const bracketOpacity = progress(t, 0, timing.bracketsIn, ease.fade)
        const gap = 3 + (bracketGap - 3) * Math.min(1, state.frame / 30)
        place(left, centerX - state.frame / 2 - gap - bracketWidth, top, bracketOpacity)
        place(right, centerX + state.frame / 2 + gap, top, bracketOpacity)

        // A fading change: the old phrase fades out, then the new one fades in.
        let oldOpacity = 0
        let newOpacity = 1
        if (state.last?.fade) {
          const middle = state.last.time + 0.4 * timing.fade
          oldOpacity = 1 - progress(t, state.last.time, middle, ease.fade)
          newOpacity = progress(t, middle, state.last.time + timing.fade, ease.fade)
        }
        setText(word, state.text)
        place(word, centerX - state.center / 2, top, newOpacity)
        setText(oldWord, oldOpacity > 0 ? state.previous : '')
        place(oldWord, centerX - state.previousWidth / 2, top, oldOpacity)

        // The whole intro fades out and shows Home under it.
        overlay.style.opacity = String(1 - progress(t, leaveStart, leaveEnd, ease.fade))
        if (t >= leaveEnd) {
          setPlaying(false)
          return
        }
        frameId = requestAnimationFrame(draw)
      }

      frameId = requestAnimationFrame(draw)
    }

    // Widths are correct only with the real font, so wait for it.
    document.fonts.load('500 88px "Host Grotesk"').then(() => {
      if (!stopped) {
        start()
      }
    })

    return () => {
      stopped = true
      cancelAnimationFrame(frameId)
    }
  }, [])

  if (!playing) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-hidden bg-ink font-title text-title text-paper"
    >
      <span ref={leftRef} className={part}>[</span>
      <span ref={rightRef} className={part}>]</span>
      <span ref={wordRef} className={part} />
      <span ref={oldWordRef} className={part} />
    </div>
  )
}

export default Intro

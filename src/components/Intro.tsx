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

// One copy of the brackets and the phrases. The order of the spans matches getParts.
const copyMarkup = (
  <>
    <span className={part}>[</span>
    <span className={part}>]</span>
    <span className={part} />
    <span className={part} />
  </>
)

type Parts = {
  left: HTMLElement
  right: HTMLElement
  word: HTMLElement
  oldWord: HTMLElement
}

function getParts(copy: HTMLElement): Parts {
  const [left, right, word, oldWord] = Array.from(copy.children) as HTMLElement[]
  return { left, right, word, oldWord }
}

function Intro() {
  const [playing, setPlaying] = useState(shouldPlay)
  const overlayRef = useRef<HTMLDivElement>(null)
  const inkRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const ink = inkRef.current
    const paper = paperRef.current
    if (!overlay || !ink || !paper) {
      return
    }

    sessionStorage.setItem(storageKey, 'yes')
    const inkParts = getParts(ink)
    const paperParts = getParts(paper)
    let frameId = 0
    let stopped = false

    // Arrow functions, so TypeScript keeps the null check above inside them.
    const start = () => {
      // Measure each text in the word element before the first frame.
      const { word } = inkParts
      const events = buildEvents((text) => {
        word.textContent = text
        return word.offsetWidth
      })
      const nameStart = events[events.length - 1].time
      const afterName = (range: number[]) => range.map((offset) => nameStart + offset)
      const [sweepStart, sweepEnd] = afterName(timing.sweep)
      const [nameOutStart, nameOutEnd] = afterName(timing.nameOut)
      const [leaveStart, leaveEnd] = afterName(timing.leave)
      const bracketWidth = inkParts.left.offsetWidth
      const lineHeight = word.offsetHeight
      const startTime = performance.now()

      const draw = (now: number) => {
        const t = (now - startTime) / 1000
        const state = bracketState(events, t)
        const width = window.innerWidth
        const height = window.innerHeight
        const centerX = width / 2
        const top = (height - lineHeight) / 2

        // The brackets fade in, and they touch each other when the frame is empty.
        const bracketOpacity = progress(t, 0, timing.bracketsIn, ease.fade)
        const gap = 3 + (bracketGap - 3) * Math.min(1, state.frame / 30)

        // A fading change: the old phrase fades out, then the new one fades in.
        let oldOpacity = 0
        let newOpacity = 1
        if (state.last?.fade) {
          const middle = state.last.time + 0.4 * timing.fade
          oldOpacity = 1 - progress(t, state.last.time, middle, ease.fade)
          newOpacity = progress(t, middle, state.last.time + timing.fade, ease.fade)
        }

        const drawCopy = (copy: Parts, opacity: number) => {
          place(copy.left, centerX - state.frame / 2 - gap - bracketWidth, top, bracketOpacity * opacity)
          place(copy.right, centerX + state.frame / 2 + gap, top, bracketOpacity * opacity)
          setText(copy.word, state.text)
          place(copy.word, centerX - state.center / 2, top, newOpacity * opacity)
          setText(copy.oldWord, oldOpacity > 0 ? state.previous : '')
          place(copy.oldWord, centerX - state.previousWidth / 2, top, oldOpacity * opacity)
        }
        drawCopy(inkParts, 1)
        drawCopy(paperParts, 1 - progress(t, nameOutStart, nameOutEnd, ease.fade))

        // The sweep: a white bracket on its side rises from the bottom. The paper copy shows
        // under its edge, and its two arms reach up at the sides of the screen.
        const armWidth = 0.06 * width
        const armLength = 0.14 * height
        const sweep = progress(t, sweepStart, sweepEnd, ease.move)
        const edge = height + armLength - (height + armLength + 2) * sweep
        const armTop = edge - armLength
        paper.style.clipPath = `polygon(0 ${armTop}px, ${armWidth}px ${armTop}px, ${armWidth}px ${edge}px, ${width - armWidth}px ${edge}px, ${width - armWidth}px ${armTop}px, ${width}px ${armTop}px, ${width}px ${height}px, 0 ${height}px)`

        // The white intro fades out and shows Home under it.
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
      className="fixed inset-0 z-50 overflow-hidden font-title text-title"
    >
      <div ref={inkRef} className="absolute inset-0 bg-ink text-paper">
        {copyMarkup}
      </div>
      <div
        ref={paperRef}
        className="absolute inset-0 bg-paper text-ink [clip-path:inset(100%_0_0_0)]"
      >
        {copyMarkup}
      </div>
    </div>
  )
}

export default Intro

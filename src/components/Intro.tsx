import { useEffect, useRef, useState } from 'react'
import { intro } from '../content/intro.ts'
import {
  bracketGap,
  bracketState,
  buildEvents,
  dotState,
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

const big = 'absolute top-0 left-0 whitespace-pre font-title text-title opacity-0'
const medium = 'absolute top-0 left-0 whitespace-pre text-[20px]/7 opacity-0'
const corner = 'absolute whitespace-pre opacity-0'

// One copy of everything that the sweep changes from white on ink to ink on white.
const copyMarkup = (
  <>
    <span data-part="left" className={big}>[</span>
    <span data-part="right" className={big}>]</span>
    <span data-part="word" className={big} />
    <span data-part="oldWord" className={big} />
    <span data-part="caption" className={medium}>{intro.greetingCaption}</span>
    <span data-part="role" className={medium}>{intro.role}</span>
    <span data-part="topLeft" className={`${corner} top-6 left-6`}>{intro.topLeft}</span>
    <span data-part="topRight" className={`${corner} top-6 right-6`}>{intro.topRight}</span>
    <span data-part="bottomLeft" className={`${corner} bottom-6 left-6`}>{intro.bottomLeft}</span>
    <span data-part="clock" className={`${corner} right-6 bottom-6`} />
  </>
)

type Parts = {
  left: HTMLElement
  right: HTMLElement
  word: HTMLElement
  oldWord: HTMLElement
  caption: HTMLElement
  role: HTMLElement
  corners: HTMLElement[]
  clock: HTMLElement
}

function getParts(copy: HTMLElement): Parts {
  const get = (name: string) => {
    const element = copy.querySelector<HTMLElement>(`[data-part="${name}"]`)
    if (!element) {
      throw new Error(`The intro has no ${name} part.`)
    }
    return element
  }

  return {
    left: get('left'),
    right: get('right'),
    word: get('word'),
    oldWord: get('oldWord'),
    caption: get('caption'),
    role: get('role'),
    corners: ['topLeft', 'topRight', 'bottomLeft', 'clock'].map(get),
    clock: get('clock'),
  }
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
    const dots = Array.from(ink.querySelectorAll<HTMLElement>('[data-part="dot"]'))
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
      const timeOf = (text: string) => {
        const event = events.find((item) => item.text === text)
        if (!event) {
          throw new Error(`The intro script has no "${text}" phrase.`)
        }
        return event.time
      }
      const nameStart = timeOf(intro.name)
      const captionStart = timeOf(intro.greeting) + timing.captionDelay
      const leadStart = timeOf(intro.lead)
      const roleStart = nameStart + timing.role
      const captionWidth = inkParts.caption.offsetWidth
      const roleWidth = inkParts.role.offsetWidth
      const afterName = (range: number[]) => range.map((offset) => nameStart + offset)
      const [sweepStart, sweepEnd] = afterName(timing.sweep)
      const [nameOutStart, nameOutEnd] = afterName(timing.nameOut)
      const [leaveStart, leaveEnd] = afterName(timing.leave)
      const bracketWidth = inkParts.left.offsetWidth
      const lineHeight = word.offsetHeight
      const startTime = performance.now()

      // Draw the intro as it looks at t seconds.
      const drawFrame = (t: number) => {
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

        // Small texts rise 8 px and fade in. The caption fades out when the lead phrase starts.
        const appear = (start: number) => progress(t, start, start + timing.smallIn, ease.open)
        const captionOut = progress(t, leadStart, leadStart + 0.2, ease.fade)
        const roleWords = Math.max(0, Math.floor((t - roleStart) / timing.roleStep) + 1)
        const roleText = intro.role.split(' ').slice(0, roleWords).join(' ')
        const below = top + lineHeight + 20
        const clockText = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Madrid' })

        const drawCopy = (copy: Parts, opacity: number) => {
          place(copy.left, centerX - state.frame / 2 - gap - bracketWidth, top, bracketOpacity * opacity)
          place(copy.right, centerX + state.frame / 2 + gap, top, bracketOpacity * opacity)
          setText(copy.word, state.text)
          place(copy.word, centerX - state.center / 2, top, newOpacity * opacity)
          setText(copy.oldWord, oldOpacity > 0 ? state.previous : '')
          place(copy.oldWord, centerX - state.previousWidth / 2, top, oldOpacity * opacity)

          const caption = appear(captionStart)
          place(copy.caption, centerX - captionWidth / 2, below + 8 * (1 - caption), 0.5 * caption * (1 - captionOut) * opacity)
          const role = appear(roleStart)
          setText(copy.role, roleText)
          place(copy.role, centerX - roleWidth / 2, below + 8 * (1 - role), role * opacity)

          // CSS places the corner texts, so only their rise and opacity change here.
          const corners = appear(timing.cornersIn)
          setText(copy.clock, clockText)
          for (const element of copy.corners) {
            element.style.transform = `translateY(${8 * (1 - corners)}px)`
            element.style.opacity = String(0.5 * corners * opacity)
          }
        }
        drawCopy(inkParts, 1)
        drawCopy(paperParts, 1 - progress(t, nameOutStart, nameOutEnd, ease.fade))

        // The squares show only on ink. The sweep covers them.
        dots.forEach((dot, index) => {
          const spot = dotState(index, t, width, height)
          dot.style.transform = `translate(${spot.x}px, ${spot.y}px)`
          dot.style.opacity = spot.visible ? '1' : '0'
        })

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
      }

      const draw = (now: number) => {
        const t = (now - startTime) / 1000
        try {
          drawFrame(t)
        } catch (error) {
          // Close the intro, so it does not cover Home. The error still shows in the console.
          setPlaying(false)
          throw error
        }
        if (t >= leaveEnd) {
          setPlaying(false)
          return
        }
        frameId = requestAnimationFrame(draw)
      }

      frameId = requestAnimationFrame(draw)
    }

    // Widths are correct only with the real fonts, so wait for both.
    Promise.all([
      document.fonts.load('500 88px "Host Grotesk"'),
      document.fonts.load('20px Inter'),
    ])
      .then(() => {
        if (!stopped) {
          start()
        }
      })
      .catch((error) => {
        setPlaying(false)
        throw error
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
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div ref={inkRef} className="absolute inset-0 bg-ink text-paper">
        {copyMarkup}
        <span data-part="dot" className="absolute top-0 left-0 size-2.5 bg-paper opacity-0" />
        <span data-part="dot" className="absolute top-0 left-0 size-2.5 bg-paper opacity-0" />
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

import { intro } from '../content/intro.ts'

// Timing in seconds. Edit these to change the rhythm.
export const timing = {
  bracketsIn: 0.3, // the empty brackets fade in
  wordStep: 0.35, // one new word every 350 ms
  jump: 0.45, // one bracket jump
  glide: 0.6, // the text glides to the centre, slower than the brackets
  bracketLag: 0.5, // when the text gets shorter, the brackets close this much later
  fade: 0.4, // a phrase fades out in the first 40%, and the next one fades in after it
  // Seconds after the name starts:
  sweep: [1.6, 2.35], // a white bracket rises from the bottom and covers the ink
  nameOut: [2.7, 3.05], // the name on white fades out
  leave: [3.15, 3.75], // the white intro fades out and shows Home under it
}

// Space between the text and each bracket, in pixels.
export const bracketGap = 22

type Step = {
  text: string
  pause: number
  fade?: boolean
}

// Each step waits `pause` seconds, then shows its text one word at a time.
// Its first word replaces the old text. With `fade`, the old text fades out first.
const script: Step[] = [
  { text: intro.greeting, pause: 0.4 },
  { text: intro.lead, pause: 0.75, fade: true },
  { text: intro.name, pause: 0.75 },
]

export type IntroEvent = {
  time: number
  text: string
  width: number
  fade: boolean
}

// One event for each word. `measure` returns the width of a text on screen,
// so the component calls this function after the fonts load.
export function buildEvents(measure: (text: string) => number): IntroEvent[] {
  const events: IntroEvent[] = []
  let time = 0

  for (const step of script) {
    time += step.pause
    const words = step.text.split(' ')

    for (let count = 1; count <= words.length; count++) {
      const text = words.slice(0, count).join(' ')
      const fade = count === 1 && step.fade === true
      events.push({ time, text, width: measure(text), fade })
      time += timing.wordStep
    }
  }

  return events
}

// The same curve as CSS cubic-bezier(x1, y1, x2, y2).
// It turns a time fraction (0 to 1) into a progress fraction (0 to 1).
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  // One coordinate of the curve at the position u. The curve goes from 0 to 1.
  function point(p1: number, p2: number, u: number) {
    return 3 * p1 * u * (1 - u) ** 2 + 3 * p2 * u ** 2 * (1 - u) + u ** 3
  }

  return (x: number) => {
    if (x <= 0) {
      return 0
    }
    if (x >= 1) {
      return 1
    }

    // Find the position whose x equals the time fraction. Halve the range 30 times.
    let low = 0
    let high = 1
    for (let i = 0; i < 30; i++) {
      const u = (low + high) / 2
      if (point(x1, x2, u) < x) {
        low = u
      } else {
        high = u
      }
    }

    return point(y1, y2, (low + high) / 2)
  }
}

export const ease = {
  jump: cubicBezier(0.05, 0.9, 0.1, 1), // brackets: most of the distance in the first frames
  glide: cubicBezier(0.25, 0.8, 0.3, 1), // text: a softer start, so it trails the brackets
  fade: cubicBezier(0.4, 0, 0.2, 1),
  move: cubicBezier(0.65, 0, 0.35, 1), // sweep: a gentle start and a gentle stop
}

// Progress from 0 to 1 between `start` and `end`, shaped by a curve.
export function progress(t: number, start: number, end: number, curve: (x: number) => number) {
  return curve((t - start) / (end - start))
}

export type BracketState = {
  frame: number // width between the brackets
  center: number // width that the text is centred on
  text: string // text to show now
  previous: string // text before the last event, for the fade
  previousWidth: number
  last: IntroEvent | null
}

// Every event that has started adds its width change twice. The frame gets it on the jump
// curve, and the text centre gets it on the glide curve.
// When the text grows, the brackets jump at once and the text follows.
// When it gets shorter, the text moves at once and the brackets follow `bracketLag` later.
// A longer text appears only when it fits inside the closing bracket.
export function bracketState(events: IntroEvent[], t: number): BracketState {
  const state: BracketState = { frame: 0, center: 0, text: '', previous: '', previousWidth: 0, last: null }
  let width = 0

  for (const event of events) {
    if (t < event.time) {
      break
    }

    const change = event.width - width
    const bracketStart = change > 0 ? event.time : event.time + timing.bracketLag
    state.frame += change * progress(t, bracketStart, bracketStart + timing.jump, ease.jump)
    state.center += change * progress(t, event.time, event.time + timing.glide, ease.glide)

    state.previous = state.text
    state.previousWidth = width
    state.last = event
    const fits = event.width - state.center / 2 <= state.frame / 2 + bracketGap
    state.text = change > 0 && !fits ? state.previous : event.text
    width = event.width
  }

  return state
}

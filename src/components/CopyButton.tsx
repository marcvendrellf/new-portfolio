import { useState } from 'react'

type CopyButtonProps = {
  text: string
}

const copyShape = (
  <>
    <rect x="3.5" y="3.5" width="8" height="8" />
    <path d="M8.5 3.5v-3h-8v8h3" />
  </>
)

const checkShape = <path d="M1.5 6.5l3 3 6-7" />

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <button
      type="button"
      aria-label={`Copy ${text}`}
      onClick={copyText}
      className="flex h-8 w-4 cursor-pointer items-center justify-center"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        className="size-3"
      >
        {copied ? checkShape : copyShape}
      </svg>
    </button>
  )
}

export default CopyButton

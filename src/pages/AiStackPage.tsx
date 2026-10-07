import Header from '../components/Header.tsx'
import { aiStack } from '../content/aiStack.ts'
import { sections } from '../content/sections.ts'

function AiStackPage() {
  return (
    <>
      <Header section={sections.aiStack.label} />
      <main className="page-grid pt-53">
        <div className="col-span-6">
          <h1 className="font-title text-title whitespace-pre-line">{aiStack.title}</h1>
          <p className="mt-8 max-w-[448px]">{aiStack.description}</p>
        </div>
      </main>
    </>
  )
}

export default AiStackPage

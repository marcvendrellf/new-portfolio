import Header from '../components/Header.tsx'
import ListRow from '../components/ListRow.tsx'
import { aiStack } from '../content/aiStack.ts'
import { sections } from '../content/sections.ts'

function AiStackPage() {
  return (
    <>
      <Header section={sections.aiStack.label} />
      <main className="page-grid pt-53 pb-6">
        <div className="sticky top-67.5 col-span-3 self-start">
          <h1 className="font-title text-title whitespace-pre-line">{aiStack.title}</h1>
          <p className="mt-8">{aiStack.description}</p>
        </div>
        <div className="col-start-4 col-span-6 flex flex-col gap-8">
          {aiStack.groups.map((group) => (
            <section key={group.title}>
              <h2 className="pb-3 font-bold">{group.title}</h2>
              <ul>
                {group.resources.map((resource) => (
                  <li key={resource.id}>
                    <ListRow href={`/ai-stack/${resource.id}`}>
                      <span className="w-53 font-medium">{resource.name}</span>
                      <span className="w-14 opacity-55">{resource.kind}</span>
                      <span className="flex-1">{resource.summary}</span>
                      <span aria-hidden="true" className="w-4">
                        →
                      </span>
                    </ListRow>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}

export default AiStackPage

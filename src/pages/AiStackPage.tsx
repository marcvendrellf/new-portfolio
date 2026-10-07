import CatalogueLayout from '../components/CatalogueLayout.tsx'
import ListRow from '../components/ListRow.tsx'
import ListSection from '../components/ListSection.tsx'
import RowCells from '../components/RowCells.tsx'
import { aiStack } from '../content/aiStack.ts'
import { sections } from '../content/sections.ts'

function AiStackPage() {
  return (
    <CatalogueLayout
      section={sections.aiStack.label}
      title={aiStack.title}
      description={aiStack.description}
    >
      {aiStack.groups.map((group) => (
        <ListSection key={group.title} title={group.title}>
          {group.resources.map((resource) => (
            <ListRow key={resource.id} href={`/ai-stack/${resource.id}`}>
              <RowCells
                name={resource.name}
                kind={resource.kind}
                detail={resource.summary}
                arrow="→"
              />
            </ListRow>
          ))}
        </ListSection>
      ))}
    </CatalogueLayout>
  )
}

export default AiStackPage

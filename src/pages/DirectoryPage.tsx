import CatalogueLayout from '../components/CatalogueLayout.tsx'
import ListRow from '../components/ListRow.tsx'
import ListSection from '../components/ListSection.tsx'
import RowCells from '../components/RowCells.tsx'
import { directory } from '../content/directory.ts'
import { sections } from '../content/sections.ts'

function DirectoryPage() {
  return (
    <CatalogueLayout
      section={sections.directory.label}
      title={directory.title}
      description={directory.description}
    >
      {directory.linkGroups.map((group) => (
        <ListSection key={group.title} title={group.title}>
          {group.links.map((link) => (
            <ListRow key={link.url} href={link.url} target="_blank">
              <RowCells
                name={link.name}
                kind={link.kind}
                detail={link.detail}
                arrow="↗"
              />
            </ListRow>
          ))}
        </ListSection>
      ))}
      <ListSection title={directory.booksTitle}>
        {directory.books.map((book) => (
          <ListRow key={book.title}>
            <span className="w-96 font-medium">{book.title}</span>
            <span className="flex-1">{book.author}</span>
          </ListRow>
        ))}
      </ListSection>
    </CatalogueLayout>
  )
}

export default DirectoryPage

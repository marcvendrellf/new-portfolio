import Header from '../components/Header.tsx'
import ListRow from '../components/ListRow.tsx'
import ListSection from '../components/ListSection.tsx'
import RowCells from '../components/RowCells.tsx'
import { contact } from '../content/contact.ts'
import { sections } from '../content/sections.ts'

function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header section={sections.contact.label} />
      <main className="page-grid flex-1 items-center pt-11.5 pb-12">
        <div className="col-span-6 ml-10">
          <h1 className="font-title text-title whitespace-pre-line">
            {contact.title}
          </h1>
          <p className="mt-8 max-w-[448px]">{contact.description}</p>
        </div>
        <div className="col-start-7 col-span-6 -ml-3 mr-10">
          <ListSection title={contact.linksTitle}>
            {contact.links.map((link) => (
              <ListRow
                key={link.url}
                href={link.url}
                target={link.url.startsWith('https://') ? '_blank' : undefined}
              >
                <RowCells
                  name={link.name}
                  kind=""
                  detail={link.detail}
                  arrow="↗"
                />
              </ListRow>
            ))}
          </ListSection>
        </div>
      </main>
    </div>
  )
}

export default ContactPage

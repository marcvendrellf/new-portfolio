import Header from '../components/Header.tsx'
import { about } from '../content/about.ts'
import { sections } from '../content/sections.ts'

function AboutPage() {
  return (
    <>
      <Header section={sections.about.label} />
      <main className="page-grid pt-53 pb-6">
        <div className="col-span-6">
          <h1 className="font-title text-title">{about.title}</h1>
          <div className="mt-8 flex max-w-[448px] flex-col gap-6">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-8">
            {about.groups.map((group) => (
              <section key={group.label} className="flex gap-1">
                <h2 className="w-58 shrink-0 uppercase">{group.label}</h2>
                <div className="flex flex-col gap-8">
                  {group.entries.map((entry) => (
                    <div key={entry.title}>
                      <h3 className="font-bold">{entry.title}</h3>
                      {entry.roles.map((role) => (
                        <p key={role} className="font-medium">
                          {role}
                        </p>
                      ))}
                      {entry.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
                      {entry.bullets.length > 0 && (
                        <ul className="list-disc pl-5">
                          {entry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default AboutPage

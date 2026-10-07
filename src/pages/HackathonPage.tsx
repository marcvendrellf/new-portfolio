import { Navigate, useParams } from 'react-router'
import HackathonSelector from '../components/HackathonSelector.tsx'
import Header from '../components/Header.tsx'
import { hackathons } from '../content/hackathons.ts'
import { sections } from '../content/sections.ts'

function HackathonPage() {
  const { id } = useParams()
  const hackathon = hackathons.find((event) => event.id === id)

  if (hackathon === undefined) {
    const firstHref = `${sections.hackathons.href}/${hackathons[0].id}`
    return <Navigate to={firstHref} replace />
  }

  return (
    <>
      <Header section={sections.hackathons.label} />
      <main className="page-grid pt-53 pb-6">
        <div className="sticky top-67.5 col-span-6 flex h-[calc(100dvh-318px)] flex-col self-start">
          <h1 className="font-title text-title whitespace-pre-line">
            {hackathon.title}
          </h1>
          <dl className="mt-8">
            {hackathon.facts.map((fact) => (
              <div key={fact.label} className="flex h-8 items-center gap-1">
                <dt className="w-58 uppercase">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto">
            <HackathonSelector currentId={hackathon.id} />
          </div>
        </div>
        <div className="col-start-7 col-span-6 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-x-6">
            {hackathon.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {hackathon.photos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-96 w-full object-cover"
            />
          ))}
          {hackathon.squares.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6">
              {hackathon.squares.map((square) => (
                <img
                  key={square.src}
                  src={square.src}
                  alt={square.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default HackathonPage

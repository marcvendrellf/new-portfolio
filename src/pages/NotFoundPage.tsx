import Header from '../components/Header.tsx'
import { notFound } from '../content/notFound.ts'

function NotFoundPage() {
  return (
    <>
      <Header section={notFound.section} />
      <main className="page-grid pt-53 pb-6">
        <div className="col-span-6">
          <h1 className="font-title text-title whitespace-pre-line">{notFound.title}</h1>
          <p className="mt-8 max-w-[448px]">{notFound.description}</p>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage

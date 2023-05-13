import SearchForm from './components/Search'
import { Card } from './components/Card';

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-normal">
        <SearchForm action={undefined} />
      </main>

    </>

  )
}

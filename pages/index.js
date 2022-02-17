import { getSession } from 'next-auth/react'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

export default function Home() {
  return (
    <div className='h-screen overflow-hidden bg-gray-900'>
      <main className='flex'>
        <Sidebar />
        <MainContent />
      </main>

      <div>{/* Player */}</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

import { getSession } from 'next-auth/react'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import MediaPlayer from '../components/MediaPlayer'

export default function Home() {
  return (
    <div className='h-screen overflow-hidden bg-midnight'>
      <main className='flex'>
        <Sidebar />
        <MainContent />
      </main>

      <div className='sticky bottom-0'>
        <MediaPlayer />
      </div>
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

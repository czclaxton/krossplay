import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gray-900">
      <main className="">
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  )
}

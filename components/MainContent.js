import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux'
import PlaylistSongs from '../components/PlaylistSongs'
// import useSpotify from '../hooks/useSpotify'
// import { shuffle } from 'lodash'
// import { pageColors } from '../styles/styles.js'

function MainContent() {
  const { data: session, status } = useSession()
  // const dispatch = useDispatch()
  // const spotifyApi = useSpotify()
  const [color, setColor] = useState('from-indigo-500')
  const playlistsState = useSelector(state => state.playlists)

  // useEffect(() => {
  //   setColor(shuffle(pageColors).pop())
  // }, [playlistsState.selectedPlaylist])

  return (
    <div className='h-screen flex-grow overflow-y-scroll text-whiteA scrollbar-hide'>
      <header className='absolute top-5 right-8'>
        <div
          className='flex cursor-pointer items-center space-x-3 rounded-full bg-midnightB p-1 pr-2 opacity-90 hover:text-pinkA hover:opacity-80'
          onClick={signOut}
        >
          <img
            className='h-10 w-10 rounded-full'
            src={session?.user?.image}
            alt=''
          />

          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${color} to-gray-900 text-whiteA`}
      >
        <>
          <img
            src={playlistsState.selectedPlaylist?.images[0]?.url}
            className='h-44 w-44 shadow-2xl'
            alt=''
          />
          <div>
            <p>PLAYLIST</p>
            <h1 className='text-2xl font-bold md:text-3xl xl:text-5xl'>
              {playlistsState.selectedPlaylist?.name}
            </h1>
          </div>
        </>
      </section>
      <div>
        <PlaylistSongs />
      </div>
    </div>
  )
}

export default MainContent

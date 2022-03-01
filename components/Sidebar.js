import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { getUserPlaylists, setSelectedPlaylist } from '../redux/slices'
import { useSpotify } from '../hooks'

function Sidebar() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const playlistsState = useSelector(state => state.playlists)
  const spotifyApi = useSpotify()

  useEffect(async () => {
    dispatch(getUserPlaylists(spotifyApi))
  }, [session])

  return (
    <div className='hidden h-screen overflow-auto border-r border-midnight p-5 pb-36 text-xs text-whiteA scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm'>
      <div className='space-y-1'>
        <button className='delay-50 flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-blueB'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-blueB'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-blueB'>
          <CollectionIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-cyan-900' />

        <button className='flex items-center space-x-2 py-2 transition duration-300 ease-in-out  hover:scale-105 hover:text-blueB'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-blueB'>
          <HeartIcon className='h-5 w-5' />
          <p>Likes</p>
        </button>
        <button className='flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-blueB'>
          <RssIcon className='h-5 w-5' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-cyan-900' />

        {Object.values(playlistsState.entities).map(playlist => (
          <p
            key={playlist.id}
            className='cursor-pointer py-1 hover:text-blueB'
            onClick={() =>
              dispatch(
                setSelectedPlaylist({ playlistId: playlist.id, spotifyApi })
              )
            }
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

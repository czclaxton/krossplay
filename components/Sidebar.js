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
import { signOut, useSession } from 'next-auth/react'
import { getUserPlaylists, selectPlaylist } from '../redux/slices'
import useSpotify from '../hooks/useSpotify'

function Sidebar() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const playlistsState = useSelector(state => state.playlists)
  const spotifyApi = useSpotify()

  useEffect(async () => {
    dispatch(getUserPlaylists(spotifyApi))
  }, [session])

  return (
    <div className='h-screen overflow-auto border-r border-gray-900 p-5 text-sm text-cyan-500 scrollbar-hide'>
      <div className='space-y-1'>
        <button
          className='delay-50 flex items-center space-x-2 py-1 transition duration-300  ease-in-out hover:scale-105 hover:text-white'
          onClick={() => signOut()}
        >
          <HomeIcon className='h-5 w-5' />
          <p>Logout</p>
        </button>
        <button className='delay-50 flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <CollectionIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-cyan-900' />

        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Likes</p>
        </button>
        <button className='hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-cyan-900' />

        {Object.values(playlistsState.entities).map(playlist => (
          <p
            key={playlist.id}
            className='cursor-pointer py-1 hover:text-white'
            onClick={() => dispatch(selectPlaylist(playlist.id))}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

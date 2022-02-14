import React from 'react'
import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'

function Sidebar() {
  const { data: session, status } = useSession()

  return (
    <div className="border-r border-gray-900 p-5 text-sm text-cyan-500">
      <div className="space-y-1">
        <button
          className="delay-50 flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-white"
          onClick={() => signOut()}
        >
          <HomeIcon className="h-5 w-5 hover:animate-bounce" />
          <p>Logout</p>
        </button>
        <button className="delay-50 flex items-center space-x-2 py-2 transition duration-300  ease-in-out hover:scale-105 hover:text-white">
          <HomeIcon className="h-5 w-5 hover:animate-bounce" />
          <p>Home</p>
        </button>
        <button className="hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white">
          <CollectionIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-cyan-900" />

        <button className="hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Likes</p>
        </button>
        <button className="hover:text-whitetransition flex items-center space-x-2 py-2 duration-300  ease-in-out hover:scale-105 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists... */}
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
      </div>
    </div>
  )
}

export default Sidebar

import React from 'react'
import { useSelector } from 'react-redux'
import SpotifySong from './SpotifySong'

function PlaylistSongs() {
  const playlist = useSelector(state => state.playlists.selectedPlaylist)
  return (
    <>
      <div className='flex flex-col space-y-1 px-8 pb-28 text-whiteA'>
        {playlist?.tracks.items.map((track, i) => (
          <SpotifySong key={i} track={track} order={i} />
        ))}
      </div>
    </>
  )
}

export default PlaylistSongs

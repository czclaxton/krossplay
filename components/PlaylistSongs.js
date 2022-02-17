import React from 'react'
import { useSelector } from 'react-redux'

function PlaylistSongs() {
  const playlist = useSelector(state => state.playlists.selectedPlaylist)
  return (
    <>
      <div>
        SONGS HERE
        {/* {playlist?.tracks.map(track => (
          <div>{track.track.name}</div>
        ))} */}
      </div>
    </>
  )
}

export default PlaylistSongs

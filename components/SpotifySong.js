import React from 'react'
import { useSpotify } from '../hooks'
import { msToMinutesAndSeconds } from '../lib/helpers/time'
import { useSelector, useDispatch } from 'react-redux'
import { togglePlayTrack } from '../redux/slices'

function SpotifySong({ order, track }) {
  const spotifyApi = useSpotify()
  const dispatch = useDispatch()

  //   const mediaPlayerState = useSelector(state => state.mediaPlayer)
  return (
    <div
      className='grid cursor-pointer grid-cols-2 rounded-md py-1 px-5 text-grayA hover:bg-pinkB hover:text-whiteA'
      onClick={() =>
        dispatch(togglePlayTrack({ currentTrack: track?.track, spotifyApi }))
      }
      key={track.track.id}
    >
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img
          className='h-10 w-10'
          src={track.track?.album?.images[0]?.url}
          alt=''
        />
        <div>
          <p className='w-36 truncate font-medium text-whiteA lg:w-64'>
            {track.track?.name}
          </p>
          <p className='w-40'>{track.track?.artists[0]?.name}</p>
        </div>
      </div>

      <div className='ml-auto flex items-center justify-between md:ml-0'>
        <p className='hidden w-80 truncate md:inline'>
          {track.track.album.name}
        </p>
        <p>{msToMinutesAndSeconds(track.track?.duration_ms)}</p>
      </div>
    </div>
  )
}

export default SpotifySong

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSpotify, useSongInfo } from '../hooks'
import { useSession } from 'next-auth/react'
import { hydrateMediaPlayer } from '../redux/slices'
import { SwitchHorizontalIcon } from '@heroicons/react/solid'

function MediaPlayer() {
  const mediaPlayerState = useSelector(state => state.mediaPlayer)
  const spotifyApi = useSpotify()
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const songInfo = useSongInfo()

  useEffect(() => {
    if (
      spotifyApi.getAccessToken() &&
      !mediaPlayerState?.selectedMedia?.id &&
      !songInfo
    ) {
      dispatch(hydrateMediaPlayer(spotifyApi))
    }
  }, [mediaPlayerState?.selectedMedia?.id, spotifyApi, session])

  return (
    <div className='grid h-28 grid-cols-3 border-t border-pinkB border-opacity-50 bg-midnightB px-2 text-xs md:px-5 md:text-base'>
      <div className='flex items-center space-x-2'>
        <img
          src={songInfo?.album?.images?.[0]?.url}
          className='hidden h-10 w-10 rounded-sm md:inline'
          alt=''
        />
        <div>
          <h3 className='text-whiteA'>{songInfo?.name}</h3>
          <p className='text-pinkA'>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div>
        <SwitchHorizontalIcon />
      </div>
    </div>
  )
}

export default MediaPlayer

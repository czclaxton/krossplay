import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useSpotify, useSongInfo } from '../hooks'
import { useSession } from 'next-auth/react'
import {
  hydrateMediaPlayer,
  togglePlayTrack,
  updateVolume,
  skipToPrevious,
  skipToNext,
} from '../redux/slices'
import {
  SwitchHorizontalIcon,
  RewindIcon,
  VolumeUpIcon,
  ReplyIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
} from '@heroicons/react/solid'
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'

function MediaPlayer() {
  const mediaPlayerState = useSelector(state => state.mediaPlayer)
  const isPlaying = useSelector(state => state.mediaPlayer.isPlaying)
  const spotifyApi = useSpotify()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [volume, setVolume] = useState(mediaPlayerState?.volume || 50)
  const songInfo = useSongInfo()

  const debouncedAdjustVolume = useCallback(
    debounce(volume => {
      try {
        dispatch(updateVolume(volume))
        spotifyApi.setVolume(volume)
      } catch (err) {
        throw err
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (
      spotifyApi.getAccessToken() &&
      !mediaPlayerState?.selectedMedia?.id &&
      !songInfo
    ) {
      dispatch(hydrateMediaPlayer(spotifyApi))
    }
  }, [mediaPlayerState?.selectedMedia, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

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
      <div className='flex items-center  justify-evenly'>
        <SwitchHorizontalIcon className='media-button' />
        <RewindIcon
          className='media-button'
          onClick={() => dispatch(skipToPrevious(spotifyApi))}
        />

        {isPlaying ? (
          <PauseIcon
            onClick={() =>
              dispatch(
                togglePlayTrack({
                  currentTrack: songInfo,
                  spotifyApi,
                })
              )
            }
            className='media-button h-10 w-10'
          />
        ) : (
          <PlayIcon
            onClick={() =>
              dispatch(
                togglePlayTrack({
                  currentTrack: songInfo,
                  spotifyApi,
                })
              )
            }
            className='media-button h-10 w-10'
          />
        )}

        <FastForwardIcon
          className='media-button'
          onClick={() => dispatch(skipToNext(spotifyApi))}
        />
        <ReplyIcon className='media-button' />
      </div>

      <div className='flex items-center justify-end space-x-3 pr-5 md:space-x-4'>
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(prev => prev - 10)}
          className='media-button'
        />
        <input
          className='form-range w-14 cursor-pointer md:w-28'
          type='range'
          value={volume}
          onChange={e => {
            setVolume(Number(e.target.value))
          }}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(prev => prev + 10)}
          className='media-button'
        />
      </div>
    </div>
  )
}

export default MediaPlayer

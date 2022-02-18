import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSpotify } from '../hooks'
import { fetchSpotifySongBase } from '../lib/helpers/pathVariables'

export function useSongInfo() {
  const currentTrack = useSelector(state => state.mediaPlayer.selectedMedia)
  const spotifyApi = useSpotify()
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrack?.id) {
        const trackInfo = await fetch(
          `${fetchSpotifySongBase}${currentTrack.id}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then(res => res.json())

        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo()
  }, [currentTrack?.id, spotifyApi])

  return songInfo
}

import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { spotifyApi } from '../lib/spotify'

export function useSpotify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // If refresh token fails, redirect to login
      if (session.error === 'RefreshAccessTokenError') signIn()

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

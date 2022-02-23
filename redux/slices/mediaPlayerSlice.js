import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { sliceBuilder } from '.'

const sliceName = 'mediaPlayer'

const playOrPause = (currentTrack, { isPlaying, selectedMedia }) => {
  if (!selectedMedia && currentTrack?.id) {
    return 'play'
  }

  if (isPlaying === false && selectedMedia === null && currentTrack?.id) {
    return 'play'
  }

  if (isPlaying === true && selectedMedia?.id === currentTrack.id) {
    return 'pause'
  }

  if (isPlaying === true && selectedMedia?.id !== currentTrack.id) {
    return 'play'
  }

  throw { code: 'spotifyApi', message: 'Error toggling track' }
}

export const togglePlayTrack = createAsyncThunk(
  `${sliceName}/togglePlayTrack`,
  async ({ currentTrack, spotifyApi }, { rejectWithValue, getState }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const { statusCode } = await spotifyApi[
        playOrPause(currentTrack, getState().mediaPlayer)
      ]({
        uris: [currentTrack.uri],
      })

      if (statusCode !== 204)
        throw { code: 'spotifyApi', message: 'Error making play request' }

      return currentTrack
    } catch (err) {
      return rejectWithValue({
        code: err.code || 'error',
        message: err.message ? err.message : 'Unknown error',
        fields: [],
      })
    }
  }
)

export const hydrateMediaPlayer = createAsyncThunk(
  `${sliceName}/hydrateMediaPlayer`,
  async (spotifyApi, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const currentTrack = await spotifyApi.getMyCurrentPlayingTrack()

      const playbackState = await spotifyApi.getMyCurrentPlaybackState()

      return {
        selectedMedia: currentTrack?.body?.item,
        isPlaying: playbackState?.body?.is_playing,
      }
    } catch (err) {
      return rejectWithValue({
        code: err.code || 'error',
        message: err.message ? err.message : 'Unknown error',
        fields: [],
      })
    }
  }
)

// export const skipToPrevious = createAsyncThunk(
//   `${sliceName}/skipToPrevious`,
//   async (spotifyApi, { rejectWithValue }) => {
//     try {
//       console.log('test ================================ ')
//       if (!spotifyApi.getAccessToken())
//         throw { code: 'auth', message: 'Spotify token error' }

//       const res = await spotifyApi.skipToPrevious()

//       console.log('res', res)

//       if (statusCode !== 204)
//         throw { code: 'spotifyApi', message: 'Error skipping track' }
//     } catch (err) {
//       return rejectWithValue({
//         code: err.code || 'error',
//         message: err.message ? err.message : 'Unknown error',
//         fields: [],
//       })
//     }
//   }
// )

const entityAdapterThunks = [
  {
    adapterFunc: (state, payload) => {
      state.selectedMedia = !state.isPlaying ? payload : null
      state.isPlaying = !state.isPlaying
    },
    thunk: togglePlayTrack,
  },
  {
    adapterFunc: (state, { selectedMedia, isPlaying }) => {
      state.selectedMedia = selectedMedia
      state.isPlaying = isPlaying
      state.volume = 50
    },
    thunk: hydrateMediaPlayer,
  },
  // {
  //   adapterFunc: (state, { selectedMedia, isPlaying }) => {
  //     // state.selectedMedia = selectedMedia
  //     // state.isPlaying = isPlaying
  //     // state.volume = 50
  //   },
  //   thunk: skipToPrevious,
  // },
]

export const initialMediaPlayerState = {
  ids: [],
  entities: {},
  error: null,
  loading: false,
  selectedMedia: null,
  isPlaying: false,
  volume: 50,
}

export const mediaPlayerSlice = sliceBuilder({
  name: sliceName,
  initialState: initialMediaPlayerState,
  entityAdapterThunks,
  reducers: {
    // toggleIsPlaying: (state, action) => {
    //   return {
    //     ...state,
    //     isPlaying: !state.isPlaying,
    //   }
    // },
  },
})

// export const { toggleIsPlaying } = mediaPlayerSlice.actions

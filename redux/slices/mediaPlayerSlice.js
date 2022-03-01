import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { sliceBuilder } from '.'

const sliceName = 'mediaPlayer'

export const playTrack = createAsyncThunk(
  `${sliceName}/playTrack`,
  async ({ currentTrack, spotifyApi }, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const { statusCode } = await spotifyApi['play']({
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

export const pauseTrack = createAsyncThunk(
  `${sliceName}/pauseTrack`,
  async ({ currentTrack, spotifyApi }, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const { statusCode } = await spotifyApi['pause']({
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

export const togglePlayTrack = createAsyncThunk(
  `${sliceName}/togglePlayTrack`,
  async ({ currentTrack, spotifyApi }, { rejectWithValue, getState }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const {
        body: { item: currentMedia },
      } = await spotifyApi.getMyCurrentPlayingTrack()

      const {
        body: { is_playing: isPlaying },
      } = await spotifyApi.getMyCurrentPlaybackState()

      let status_code
      let action

      if (currentTrack?.id === currentMedia?.id) {
        action = isPlaying ? 'pause' : 'play'
        const { statusCode } = await spotifyApi[action]({
          uris: [currentTrack.uri],
        })
        status_code = statusCode
      } else {
        action = 'play'
        const { statusCode } = await spotifyApi[action]({
          uris: [currentTrack.uri],
        })
        status_code = statusCode
      }

      if (status_code !== 204)
        throw { code: 'spotifyApi', message: 'Error making play request' }

      return { ...currentTrack, isPlaying: action === 'play' }
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
//       if (!spotifyApi.getAccessToken())
//         throw { code: 'auth', message: 'Spotify token error' }

//       const res = await spotifyApi.skipToPrevious()

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
      state.selectedMedia = payload
      state.isPlaying = payload.isPlaying
    },
    thunk: togglePlayTrack,
  },
  {
    adapterFunc: (state, payload) => {
      state.selectedMedia = payload
      state.isPlaying = true
    },
    thunk: playTrack,
  },
  {
    adapterFunc: (state, payload) => {
      state.selectedMedia = payload
      state.isPlaying = false
    },
    thunk: pauseTrack,
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
    updateVolume: (state, { payload }) => {
      return {
        ...state,
        volume: payload,
      }
    },
  },
})

export const { updateVolume } = mediaPlayerSlice.actions

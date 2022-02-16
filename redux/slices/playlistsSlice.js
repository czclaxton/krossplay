import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { sliceBuilder } from './'

const sliceName = 'playlists'

export const getUserPlaylists = createAsyncThunk(
  `${sliceName}/getUserPlaylists`,
  async (spotifyApi, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const userPlaylists = await spotifyApi.getUserPlaylists()

      console.log('userPlaylists', userPlaylists)

      return userPlaylists.body.items
    } catch (err) {
      return rejectWithValue({
        code: 'error',
        message: err.message ? err.message : 'Unknown error',
        fields: [],
      })
    }
  }
)

const adapter = createEntityAdapter()

const entityAdapterThunks = [
  {
    adapterFunc: adapter.setAll,
    thunk: getUserPlaylists,
  },
]

export const initialPlaylistState = {
  ids: [],
  entities: {},
  error: null,
  loading: false,
}

export const playlistsSlice = sliceBuilder({
  name: sliceName,
  initialState: initialPlaylistState,
  entityAdapterThunks,
})

import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { sliceBuilder } from './'

const sliceName = 'playlists'

const adapter = createEntityAdapter()

export const getUserPlaylists = createAsyncThunk(
  `${sliceName}/getUserPlaylists`,
  async (spotifyApi, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const userPlaylists = await spotifyApi.getUserPlaylists()
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

export const setSelectedPlaylist = createAsyncThunk(
  `${sliceName}/setSelectedPlaylist`,
  async ({ playlistId, spotifyApi }, { rejectWithValue }) => {
    try {
      if (!spotifyApi.getAccessToken())
        throw { code: 'auth', message: 'Spotify token error' }

      const playlist = await spotifyApi.getPlaylist(playlistId)
      return playlist.body
    } catch (err) {
      return rejectWithValue({
        code: 'error',
        message: err.message ? err.message : 'Unknown error',
        fields: [],
      })
    }
  }
)

const entityAdapterThunks = [
  {
    adapterFunc: adapter.setAll,
    thunk: getUserPlaylists,
  },
  {
    adapterFunc: (state, action) => {
      state.selectedPlaylist = action
    },
    thunk: setSelectedPlaylist,
  },
]

export const initialPlaylistState = {
  ids: [],
  entities: {},
  error: null,
  loading: false,
  selectedPlaylist: null,
}

export const playlistsSlice = sliceBuilder({
  name: sliceName,
  initialState: initialPlaylistState,
  entityAdapterThunks,
  reducers: {},
})

import { configureStore } from '@reduxjs/toolkit'
import { playlistsSlice, initialPlaylistState } from './slices'

export default configureStore({
  reducer: {
    playlists: playlistsSlice.reducer,
  },
  preloadedState: {
    playlists: initialPlaylistState,
  },
})

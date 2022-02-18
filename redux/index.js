import { configureStore } from '@reduxjs/toolkit'
import {
  playlistsSlice,
  initialPlaylistState,
  mediaPlayerSlice,
  initialMediaPlayerState,
} from './slices'

export default configureStore({
  reducer: {
    playlists: playlistsSlice.reducer,
    mediaPlayer: mediaPlayerSlice.reducer,
  },
  preloadedState: {
    playlists: initialPlaylistState,
    mediaPlayer: initialMediaPlayerState,
  },
})

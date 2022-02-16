/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, isPending, isRejected } from '@reduxjs/toolkit'

export const sliceBuilder = ({
  name,
  initialState,
  entityAdapterThunks,
  reducers,
  extraReducers,
}) => {
  return createSlice({
    name,
    initialState,
    reducers: reducers || {},
    extraReducers: builder => {
      builder = entityAdapterThunks?.reduce((builder, item) => {
        return builder.addCase(item.thunk.fulfilled, (state, action) => {
          state.loading = false
          state.error = null
          item.adapterFunc(state, action.payload)
        })
      }, builder)

      if (extraReducers) {
        builder = extraReducers(builder)
      }

      return builder
        ?.addMatcher(isPending, state => {
          state.loading = true
        })
        .addMatcher(isRejected, (state, action) => {
          if (name === action.type.split('/')[0]) {
            state.loading = false
            state.error =
              {
                code: action?.payload?.code,
                message: action?.payload?.message,
                custom: action?.payload?.custom || [],
              } || null
          }
        })
    },
  })
}

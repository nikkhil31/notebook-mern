import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { notebookApi } from '../services/notebook'

export const store = configureStore({
  reducer: {
    [notebookApi.reducerPath]: notebookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(notebookApi.middleware),
})

setupListeners(store.dispatch)

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { notebookApi } from '../services/notebook'
import activeSlice from '../slices/activeSlice'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    [notebookApi.reducerPath]: notebookApi.reducer,
    auth: authReducer,
    active: activeSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(notebookApi.middleware),
})

setupListeners(store.dispatch)

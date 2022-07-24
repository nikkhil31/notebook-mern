import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
  name: 'active',
  initialState: {
    category: null,
    note: null,
    form: 0,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
      state.note = null
      state.form = 0
    },
    setNote: (state, action) => {
      state.note = action.payload
    },
    setForm: (state, action) => {
      state.form = action.payload
    },
  },
})

export const { setCategory, setNote, setForm } = activeSlice.actions

export default activeSlice.reducer

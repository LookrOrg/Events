import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  handle: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  creationDate: "",
  image: "",
  rating: "",
  loading: false,
  authenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      
    },
  },
})

export const { getUserDetails } = userSlice.actions

export default userSlice.reducer
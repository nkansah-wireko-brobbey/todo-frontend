// Drawer Store Slice
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: 1,
    user_role: 'user',

  },
  reducers: {
    updateUser(state,action) {
      state.user_id = action.payload.user_id;
      state.user_role = action.payload.user_role;
    },
   
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;

// Drawer Store Slice
import { createSlice } from '@reduxjs/toolkit';
import client from '@/lib/apolloClient.config';
import { GET_PANELS } from '@/lib/graphql/queries';

import { createAsyncThunk } from '@reduxjs/toolkit';




export const fetchPanels = createAsyncThunk(
  'panels/fetchPanels',
  async (_, thunkAPI) => {
    try {
      const response = await client.query({
        query: GET_PANELS,
      });
      return response.data.panel;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const panelSlice = createSlice({
  name: 'panels',
  initialState: {
    data: [] as any[],
    loading: true,
    error: false
  },
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPanels.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPanels.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchPanels.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      });
  },
});

export default panelSlice.reducer;

// Drawer Store Slice
import { createSlice } from '@reduxjs/toolkit';
import client from '@/lib/apolloClient.config';
import { GET_CATEGORIES } from '@/lib/graphql/queries';

import { createAsyncThunk } from '@reduxjs/toolkit';




export const fetchCategories = createAsyncThunk(
  'category/fetchCategory',
  async (_, thunkAPI) => {
    try {
      const response = await client.query({
        query: GET_CATEGORIES,
      });
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [] as any[],
    loading: true,
    error: false
  },
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
        console.log('fetching categories...');
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        console.log(action);
        console.log(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      });
  },
});

export default categorySlice.reducer;

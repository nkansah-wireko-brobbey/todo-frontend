// Drawer Store Slice
import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isDrawerOpen: false,
    componentName: null,
    componentTitle: null,
    componentDescription: null,
    panel_id: null,

  },
  reducers: {
    openDrawer(state,action) {
      state.isDrawerOpen = true;
      state.componentName = action.payload.componentName;
      state.componentTitle = action.payload.componentTitle;
      state.componentDescription = action.payload.componentDescription;
      state.panel_id = action.payload.panel_id;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false;
      state.componentName = null;
      state.componentTitle = null;
      state.componentDescription = null;
      panel_id: null;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;

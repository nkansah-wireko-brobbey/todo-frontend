// store.js
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '@/store/reducers/drawer.slice';
import panelSlice from './reducers/panel.slice';

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    panels: panelSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


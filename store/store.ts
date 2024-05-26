// store.js
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '@/store/reducers/drawer.slice';
import panelSlice from './reducers/panel.slice';
import userSlice from './reducers/user.slice';

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    panels: panelSlice,
    user: userSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


// store.js
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '@/store/reducers/drawer.slice';
import panelSlice from './reducers/panel.slice';
import userSlice from './reducers/user.slice';
import categorySlice from './reducers/category.slice';

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    panels: panelSlice,
    user: userSlice,
    categories: categorySlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


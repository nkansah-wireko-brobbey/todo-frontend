// store.js
import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '@/store/reducers/drawer.reducer';

const store = configureStore({
  reducer: {
    drawer: drawerReducer,
  },
});

export default store;


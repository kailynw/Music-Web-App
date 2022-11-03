import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import productsReducer from '../reducer/productsReducer';
import songsReducer from '../reducer/songsReducer';
import usersReducer from '../reducer/usersReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    songs: songsReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

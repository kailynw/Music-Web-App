import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import productsReducer from '../reducer/productsReducer';
import songsReducer from '../reducer/songsReducer';
import usersReducer from '../reducer/usersReducer';
import navigationReducer from '../reducer/navigationReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    songs: songsReducer,
    users: usersReducer,
    navigation: navigationReducer
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

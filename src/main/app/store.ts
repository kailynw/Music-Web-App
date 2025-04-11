import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import productsReducer from '../reducer/productsReducer';
import songsReducer from '../reducer/songsReducer';
import usersReducer from '../reducer/usersReducer';
import navigationReducer from '../reducer/navigationReducer';
import alertReducer from '../reducer/alertReducer'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  songs: songsReducer,
  user: usersReducer,
  navigation: navigationReducer,
  alert: alertReducer
})



const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

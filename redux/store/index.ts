import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemonSlice';




const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
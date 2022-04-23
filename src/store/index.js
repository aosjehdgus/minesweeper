import { configureStore } from '@reduxjs/toolkit';

import { MINE, mineReducer } from '../mine/slice';

export const rootReducer = {
  [MINE]: mineReducer,
};

export const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return store;
};

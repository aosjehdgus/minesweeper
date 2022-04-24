import { configureStore } from '@reduxjs/toolkit';

import { MINESWEEPER, minesweeperReducer } from '../mine/slice';

export const rootReducer = {
  [MINESWEEPER]: minesweeperReducer,
};

export const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });

  return store;
};

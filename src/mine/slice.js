/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'minesweeper';
const initialState = {
  game: true,
  grid: [],
  mine: 15,
  timer: false,
};
const plantMine = () => {
  const candidate = Array(8 * 8)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > 8 * 8 - 15) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1,
    )[0];
    shuffle.push(chosen);
  }

  const data = Array.from(Array(8), () =>
    Array(8).fill({
      value: 0,
      isOpened: false,
      isFlagged: false,
    }),
  );

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / 8);
    const hor = shuffle[k] % 8;
    data[ver][hor] = {
      value: -1,
      isOpened: false,
      isFlagged: false,
    };
  }

  return data;
};

const reducers = {
  START_GAME: state => {
    state.timer = true;
  },
  END_GAME: state => {
    state.game = false;
    state.timer = false;
  },
  GAME_SET: state => {
    state.game = true;
    state.grid = plantMine();
    state.mine = 15;
    state.timer = false;
  },
  CELL_OPENED: (state, { payload }) => {
    const { value, row, col } = payload;
    state.grid[row][col].isOpened = true;
    if (state.grid[row][col].value === 0) {
      state.grid[row][col].value = value;
    }
  },
  FLAG_NOTE: (state, { payload }) => {
    const { row, col } = payload;
    if (state.grid[row][col].isFlagged === false) {
      state.grid[row][col].isFlagged = true;
      state.mine -= 1;
    } else {
      state.grid[row][col].isFlagged = false;
      state.mine += 1;
    }
  },
};

export const slice = createSlice({ name, initialState, reducers });

const selectGridState = createSelector(
  state => state.grid,
  grid => grid,
);

const selectGameState = createSelector(
  state => state.game,
  game => game,
);
const selectMineState = createSelector(
  state => state.mine,
  mine => mine,
);

const selectTimerState = createSelector(
  state => state.timer,
  timer => timer,
);

const selectAllState = createSelector(
  selectGridState,
  selectGameState,
  selectMineState,
  selectTimerState,
  (grid, game, mine, timer) => {
    return {
      grid,
      game,
      mine,
      timer,
    };
  },
);

export const MINESWEEPER = slice.name;
export const minesweeperReducer = slice.reducer;
export const minesweeperAction = slice.actions;

export const minesweeperSelector = {
  grid: state => selectGridState(state[MINESWEEPER]),
  game: state => selectGameState(state[MINESWEEPER]),
  mine: state => selectMineState(state[MINESWEEPER]),
  timer: state => selectTimerState(state[MINESWEEPER]),
  all: state => selectAllState(state[MINESWEEPER]),
};

/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const name = 'mine';
const initialState = {
  grid: Array.from(Array(8), () =>
    Array(8).fill({
      value: 0,
      isOpened: false,
      isFlagged: false,
    }),
  ),
};

const reducers = {
  PLANT_MINE: state => {
    state.grid = state.grid.map(row => {
      const random = Math.floor(Math.random() * 8);
      row.splice(random, 1, {
        value: -1,
        isOpened: false,
        isFlagged: false,
      });
      return row;
    });
  },
  CELL_OPENED: (state, { payload }) => {
    const { rowIndex, columnIndex } = payload;
    state.grid[rowIndex][columnIndex].isOpened = true;
  },
  FLAG_NOTE: (state, { payload }) => {
    const { rowIndex, columnIndex } = payload;
    if (state.grid[rowIndex][columnIndex].isFlagged === false) {
      state.grid[rowIndex][columnIndex].isFlagged = true;
    } else {
      state.grid[rowIndex][columnIndex].isFlagged = false;
    }
  },
  SET_VALUE: (state, { payload }) => {
    const { value, rowIndex, columnIndex } = payload;
    state.grid[rowIndex][columnIndex].value = value;
  },
};

export const slice = createSlice({ name, initialState, reducers });

const selectGridState = createSelector(
  state => state.grid,
  grid => grid,
);

const selectAllState = createSelector(
  selectGridState,

  grid => {
    return {
      grid,
    };
  },
);

export const MINE = slice.name;
export const mineReducer = slice.reducer;
export const mineAction = slice.actions;

export const mineSelector = {
  grid: state => selectGridState(state[MINE]),
  all: state => selectAllState(state[MINE]),
};

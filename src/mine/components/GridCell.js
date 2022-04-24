/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaBomb } from '@react-icons/all-files/fa/FaBomb';
import { FaFlagCheckered } from '@react-icons/all-files/fa/FaFlagCheckered';
import { mineAction, mineSelector } from '../slice';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  padding: 0;
`;

const OpenCell = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const GridCell = ({ cell, row, col, disabled }) => {
  const dispatch = useDispatch();
  const { grid, game } = useSelector(mineSelector.all);
  const { END_GAME, CELL_OPENED, FLAG_NOTE } = mineAction;
  const { value, isOpened, isFlagged } = cell;

  const STATE = value === -1 ? '지뢰' : '일반';

  const handleLeftClick = () => {
    if (!game) {
      return;
    }

    if (STATE === '지뢰') {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (grid[i][j].value === -1) {
            dispatch(CELL_OPENED({ row: i, col: j }));
          }
        }
      }

      dispatch(END_GAME());
    }
    if (STATE === '일반') {
      let count = 0;

      if (row === 0 && col === 0) {
        if (grid[row][col + 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
        if (grid[row + 1][col + 1].value === -1) count++;
      }

      if (row === 0 && col === 7) {
        if (grid[row][col - 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
        if (grid[row + 1][col - 1].value === -1) count++;
      }

      if (row === 7 && col === 0) {
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row - 1][col + 1].value === -1) count++;
        if (grid[row][col + 1].value === -1) count++;
      }

      if (row === 7 && col === 7) {
        if (grid[row - 1][col - 1].value === -1) count++;
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row][col - 1].value === -1) count++;
      }

      if (row === 0 && col < 7 && col > 0) {
        if (grid[row][col - 1].value === -1) count++;
        if (grid[row][col + 1].value === -1) count++;
        if (grid[row + 1][col + 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
        if (grid[row + 1][col - 1].value === -1) count++;
      }

      if (row === 7 && col < 7 && col > 0) {
        if (grid[row - 1][col - 1].value === -1) count++;
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row - 1][col + 1].value === -1) count++;
        if (grid[row][col - 1].value === -1) count++;
        if (grid[row][col + 1].value === -1) count++;
      }

      if (col === 0 && row < 7 && col > 0) {
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row - 1][col + 1].value === -1) count++;
        if (grid[row][col + 1].value === -1) count++;
        if (grid[row + 1][col + 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
      }

      if (col === 7 && row < 7 && row > 0) {
        if (grid[row - 1][col - 1].value === -1) count++;
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row][col - 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
        if (grid[row + 1][col - 1].value === -1) count++;
      }

      if (row !== 0 && row !== 7 && col !== 0 && col !== 7) {
        if (grid[row - 1][col - 1].value === -1) count++;
        if (grid[row - 1][col].value === -1) count++;
        if (grid[row - 1][col + 1].value === -1) count++;
        if (grid[row][col - 1].value === -1) count++;
        if (grid[row][col + 1].value === -1) count++;
        if (grid[row + 1][col + 1].value === -1) count++;
        if (grid[row + 1][col].value === -1) count++;
        if (grid[row + 1][col - 1].value === -1) count++;
      }

      if (game && isOpened === false) {
        dispatch(CELL_OPENED({ value: count, row, col }));
      }
    }
  };

  const handleRightClick = e => {
    e.preventDefault();
    if (game) {
      dispatch(FLAG_NOTE({ row, col }));
    }
  };

  return (
    <Button
      disabled={disabled}
      onClick={() => handleLeftClick()}
      onContextMenu={e => handleRightClick(e)}
    >
      {/* 
    value === -1 : 지뢰 
    value >= 0 : 주변 지뢰 카운트
    */}
      {isOpened && value === -1 ? (
        <FaBomb />
      ) : isOpened && value >= 0 ? (
        <OpenCell>{value > 0 ? value : ''}</OpenCell>
      ) : isFlagged ? (
        <FaFlagCheckered />
      ) : (
        <div />
      )}
    </Button>
  );
};

export default GridCell;

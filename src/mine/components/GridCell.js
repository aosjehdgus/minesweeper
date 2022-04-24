/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FcFlashOn } from '@react-icons/all-files/fc/FcFlashOn';
import { FcFlashOff } from '@react-icons/all-files/fc/FcFlashOff';
import { FaFlagCheckered } from '@react-icons/all-files/fa/FaFlagCheckered';
import { minesweeperAction, minesweeperSelector } from '../slice';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  padding: 0;
  background: white;
  border: 1px solid black;
`;

const OpenedCell = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  background: #efefef;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 1px 1px 3px rgba(1, 1, 1, 0.5) inset,
    -1px -1px 3px rgba(1, 1, 1, 0.5);
`;

const ClosedCell = styled.span`
  background: #efefef;
`;

const GridCell = ({ cell, row, col, disabled }) => {
  const dispatch = useDispatch();
  const { grid, game, mine, timer } = useSelector(minesweeperSelector.all);
  const { END_GAME, FLAG_NOTE, START_GAME, CELL_OPENED } = minesweeperAction;
  const { value, isOpened, isFlagged } = cell;

  const STATE = value === -1 ? '지뢰' : '일반';

  const handleLeftClick = () => {
    if (!game) {
      return;
    }

    if (isFlagged) {
      return;
    }
    if (!timer) {
      dispatch(START_GAME());
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
    if (!game) {
      return;
    }

    if (isOpened) {
      return;
    }

    if (mine > 0) dispatch(FLAG_NOTE({ row, col }));
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
        isFlagged ? (
          <FaFlagCheckered size={25} />
        ) : (
          <FcFlashOn size={30} />
        )
      ) : isOpened && value >= 0 ? (
        <OpenedCell>{value > 0 ? value : ''}</OpenedCell>
      ) : isFlagged ? (
        value === 0 && !game ? (
          <FcFlashOff size={30} />
        ) : (
          <FaFlagCheckered size={25} />
        )
      ) : (
        <ClosedCell />
      )}
    </Button>
  );
};

export default GridCell;

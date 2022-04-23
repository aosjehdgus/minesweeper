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

const GridCell = ({ cell, rowIndex, columnIndex }) => {
  const dispatch = useDispatch();
  const { grid } = useSelector(mineSelector.all);
  const { CELL_OPENED, FLAG_NOTE, SET_VALUE } = mineAction;
  const STATE = cell.value === -1 ? '지뢰' : '일반';

  const handleLeftClick = () => {
    if (STATE === '지뢰') {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (grid[i][j].value === -1) {
            dispatch(CELL_OPENED({ rowIndex: i, columnIndex: j }));
          }
        }
      }
    }
    if (STATE === '일반') {
      let count = 0;

      if (grid[rowIndex - 1][columnIndex - 1].value === -1) count++;
      if (grid[rowIndex - 1][columnIndex].value === -1) count++;
      if (grid[rowIndex - 1][columnIndex + 1].value === -1) count++;
      if (grid[rowIndex][columnIndex - 1].value === -1) count++;
      if (grid[rowIndex][columnIndex + 1].value === -1) count++;
      if (grid[rowIndex + 1][columnIndex + 1].value === -1) count++;
      if (grid[rowIndex + 1][columnIndex].value === -1) count++;
      if (grid[rowIndex + 1][columnIndex - 1].value === -1) count++;
      dispatch(SET_VALUE({ value: count, rowIndex, columnIndex }));
    }

    if (cell.isOpened === false && cell.isFlagged === false) {
      dispatch(CELL_OPENED({ rowIndex, columnIndex }));
    }
  };

  const handleRightClick = e => {
    e.preventDefault();
    dispatch(FLAG_NOTE({ rowIndex, columnIndex }));
  };

  return (
    <Button
      onClick={() => handleLeftClick()}
      onContextMenu={e => handleRightClick(e)}
    >
      {cell.isOpened && cell.value === -1 ? (
        <FaBomb />
      ) : cell.isOpened && cell.value > 0 ? (
        <OpenCell>{cell.value}</OpenCell>
      ) : cell.isOpened && cell.value === 0 ? (
        <OpenCell />
      ) : cell.isFlagged ? (
        <FaFlagCheckered />
      ) : (
        <div />
      )}
    </Button>
  );
};

export default GridCell;

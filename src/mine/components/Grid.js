/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import { minesweeperAction, minesweeperSelector } from '../slice';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(minesweeperSelector.all);
  const { GAME_SET } = minesweeperAction;

  useEffect(() => {
    dispatch(GAME_SET());
  }, []);

  return (
    <GridContainer>
      <GridHeader />
      {grid.map((rows, row) => {
        return <GridRow key={row} rows={rows} row={row} />;
      })}
    </GridContainer>
  );
};

export default Grid;

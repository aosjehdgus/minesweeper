/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import { mineAction, mineSelector } from '../slice';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = () => {
  const dispatch = useDispatch();
  const { grid } = useSelector(mineSelector.all);
  const { PLANT_MINE } = mineAction;

  useEffect(() => {
    dispatch(PLANT_MINE());
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

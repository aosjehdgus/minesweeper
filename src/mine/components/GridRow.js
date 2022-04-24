/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mineSelector } from '../slice';
import GridCell from './GridCell';

const Row = styled.div`
  display: flex;
  height: 5rem;
`;

const GridRow = ({ rows, row }) => {
  const { game } = useSelector(mineSelector.all);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (game === false) {
      setBtnDisabled(true);
    }
  }, [game]);

  return (
    <Row>
      {rows.map((cell, col) => {
        return (
          <GridCell
            disabled={btnDisabled}
            key={col}
            cell={cell}
            row={row}
            col={col}
          />
        );
      })}
    </Row>
  );
};

export default GridRow;

/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import GridCell from './GridCell';

const Row = styled.div`
  display: flex;
  height: 5rem;
`;

const GridRow = ({ row, rowIndex }) => {
  return (
    <Row>
      {row.map((cell, columnIndex) => {
        return (
          <GridCell
            row={row}
            key={columnIndex}
            cell={cell}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        );
      })}
    </Row>
  );
};

export default GridRow;

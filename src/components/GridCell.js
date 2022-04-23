/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Cell = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

const GridCell = ({ isMine, isOpened, isFlagged }) => {
  return <Cell>{isMine ? <div>지뢰</div> : <div>빈칸</div>}</Cell>;
};

export default GridCell;

/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { mineSelector } from '../slice';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
`;

const GridHeader = () => {
  const { grid } = useSelector(mineSelector.all);

  const mineCount = () => {
    let count = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (grid[i][j].value === -1) {
          count++;
        }
      }
    }

    return count;
  };

  return (
    <Header>
      <div>남은 지뢰 : {mineCount()} </div>
      <button type="button">재시작 버튼</button>
      <div>타이머</div>
    </Header>
  );
};

export default GridHeader;

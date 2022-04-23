import React from 'react';
import styled from 'styled-components';
import GridHeader from './GridHeader';
import GridCell from './GridCell';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridRow = styled.div`
  display: flex;
`;

const Grid = () => {
  const grid = Array.from(Array(8), () =>
    Array(8).fill({
      isMine: false,
      isOpened: false,
      isFlagged: false,
    }),
  );

  return (
    <GridContainer>
      <GridHeader />
      {grid.map(row => {
        return (
          <GridRow>
            {row.map(({ isMine, isOpened, isFlagged }) => (
              <GridCell
                isMine={isMine}
                isOpened={isOpened}
                isFlagged={isFlagged}
              />
            ))}
          </GridRow>
        );
      })}
    </GridContainer>
  );
};

export default Grid;

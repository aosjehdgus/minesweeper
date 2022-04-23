import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
`;

function GridHeader() {
  return (
    <Header>
      <div>남은 지뢰</div>
      <button type="button">재시작 버튼</button>
      <div>타이머</div>
    </Header>
  );
}

export default GridHeader;

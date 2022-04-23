import React from 'react';
import styled from 'styled-components';
import Grid from './components/Grid';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <Container>
      <Grid />
    </Container>
  );
};

export default App;

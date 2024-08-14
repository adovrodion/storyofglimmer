import React from 'react';
import styled from 'styled-components';
import MintButton from './MintButton';
import HistoryButton from './HistoryButton';
import ConnectButton from './ConnectButton';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopBar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
`;

const MainContainer = () => {
  return (
    <Container>
      <TopBar>
        <HistoryButton />
        <ConnectButton />
      </TopBar>
      <MintButton />
    </Container>
  );
};

export default MainContainer;
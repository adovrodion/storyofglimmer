import React from 'react';
import styled from 'styled-components';
import MintButton from './MintButton';
import HistoryButton from './HistoryButton';
import ConnectButton from './ConnectButton';
import twitterLogo from '../assets/twitter.png';

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

const TwitterLogo = styled.a`
  position: absolute;
  bottom: 5px;
  right: 40px;
  width: 80px;
  height: 80px;
  background-image: url(${twitterLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const MainContainer = () => {
  return (
    <Container>
      <TopBar>
        <HistoryButton />
        <ConnectButton />
      </TopBar>
      <MintButton />
      <TwitterLogo 
        href="https://x.com/storyofglimmer" 
        target="_blank" 
        rel="noopener noreferrer"
      />
    </Container>
  );
};

export default MainContainer;
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import historyButtonImage from '../assets/history-button.png';

const StyledLink = styled(Link)`
  display: block;
  width: 350px;
  height: 80px;
  background-image: url(${historyButtonImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
`;

const HistoryButton = () => {
  return <StyledLink to="/history"></StyledLink>;
};

export default HistoryButton;
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import historyButtonImage from '../assets/history-button.png';

const StyledLink = styled(Link)`
  padding: 15px 120px;
  font-size: 30px;
  width: 350px; // Установите ширину, соответствующую вашему изображению
  height: 80px; // Установите высоту, соответствующую вашему изображению
  background-image: url(${historyButtonImage});
  color: red;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FFFFFF;
  }
`;

const HistoryButton = () => {
  return <StyledLink to="/history"></StyledLink>;
};

export default HistoryButton;
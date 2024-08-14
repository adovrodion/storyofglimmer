import React, { useState } from 'react';
import styled from 'styled-components';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/contractInteraction';
import mintButtonImage from '../assets/mint-button.png';

const StyledButton = styled.button`
  position: absolute;
  bottom: 0.1%; // Регулируйте это значение для вертикального положения
  left: 44%;
  transform: translateX(-50%);
  width: 440px; // Увеличьте ширину
  height: 110px; // Увеличьте высоту
  background-image: url(${mintButtonImage});
  background-size: 440px 110px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  font-size: 0;
  color: transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px; // Увеличьте размер шрифта
    color: white;
    font-family: 'Arial', sans-serif;
    font-weight: bold; // Сделайте шрифт жирным
  }
`;

const MintButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const { address, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'safeMint',
    args: [address],
  });

  const { write: mint, isLoading, isSuccess } = useContractWrite(config);

  const handleMint = async () => {
    if (!isConnected) {
      alert('Пожалуйста, сначала подключите кошелек');
      return;
    }
  
    console.log('Конфигурация mint:', config);
    console.log('Функция mint:', mint);
  
    if (!mint) {
      console.error('Функция mint не определена');
      alert('Ошибка: функция mint не определена');
      return;
    }
  
    setIsMinting(true);
    try {
      console.log('Начало минтинга...');
      await mint();
      console.log('Минтинг запущен');
    } catch (error) {
      console.error('Ошибка при минтинге:', error);
      if (error.message.includes('user rejected transaction')) {
        console.log('Транзакция была отклонена пользователем');
      } else {
        alert(`Ошибка при минтинге: ${error.message}`);
      }
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <StyledButton onClick={handleMint} disabled={!isConnected || isMinting || isLoading}>
      {isMinting || isLoading ? 'Минтинг...' : 'MINT'}
    </StyledButton>
  );
};

export default MintButton;
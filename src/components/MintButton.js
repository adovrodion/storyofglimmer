import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAccount, useContractWrite, usePrepareContractWrite, useNetwork, useWaitForTransaction } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/contractInteraction';
import mintButtonImage from '../assets/mint-button.png';
import { base } from 'wagmi/chains';
import Modal from 'react-modal';
import Confetti from 'react-confetti';


const StyledButton = styled.button`
  position: absolute;
  bottom: 0.1%;
  left: 44%;
  transform: translateX(-50%);
  width: 440px;
  height: 110px;
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
    font-size: 32px;
    color: white;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
  }
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'url("/pixel-background.png")',
    borderRadius: '10px',
    border: '4px solid #ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    textAlign: 'center',
    fontFamily: '"Press Start 2P", cursive',
    color: '#ffffff',
  },
};

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const SmallParagraph = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
`;

const TxLink = styled.a`
  color: #00ff00;
`;

const OpenSeaLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
`;

const CloseBtn = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
`;

const MintButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txId, setTxId] = useState('');
  const [tokenId, setTokenId] = useState(null);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const isBaseNetwork = chain?.id === base.id;

  const { config } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'safeMint',
    args: [address],
    enabled: isBaseNetwork,
  });

  const { write: mint, isLoading, isSuccess: isMintSuccess, data } = useContractWrite(config);

  const { data: transactionReceipt, isLoading: isWaiting } = useWaitForTransaction({
    hash: txId,
    enabled: !!txId,
  });
  
  useEffect(() => {
    if (isMintSuccess && data) {
      setIsSuccess(true);
      setIsModalOpen(true);
      setTxId(data.hash);
      console.log('Transaction hash:', data.hash);
    }
  }, [isMintSuccess, data]);
  
  useEffect(() => {
    if (transactionReceipt) {
      console.log('Transaction receipt:', transactionReceipt);
      const transferEvent = transactionReceipt.logs.find(log => 
        log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // Transfer event topic
      );
      if (transferEvent && transferEvent.topics[3]) {
        const tokenId = parseInt(transferEvent.topics[3], 16);
        setTokenId(tokenId.toString());
      }
    }
  }, [transactionReceipt]);

  const handleMint = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
  
    if (!isBaseNetwork) {
      alert('Please switch to the Base network for minting');
      return;
    }
  
    if (!mint) {
      console.error('Mint function is not defined');
      alert('Error: mint function is not defined');
      return;
    }
  
    setIsMinting(true);
    try {
      console.log('Minting started...');
      const result = await mint();
      console.log('Minting result:', result);
      if (result && result.hash) {
        setTxId(result.hash);
        console.log('Minting successfully started, transaction hash:', result.hash);
      } else {
        console.error('Unexpected minting result:', result);
      }
    } catch (error) {
      console.error('Error during minting:', error);
      if (error.message.includes('user rejected transaction')) {
        console.log('Transaction was rejected by the user');
      } else {
        alert(`Error during minting: ${error.message}`);
      }
    } finally {
      setIsMinting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <>
      <StyledButton 
        onClick={handleMint} 
        disabled={!isConnected || !isBaseNetwork || isMinting || isLoading}
      >
        {!isBaseNetwork ? 'Switch to Base' : (isMinting || isLoading ? 'Minting...' : 'MINT')}
      </StyledButton>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="NFT Minted"
        style={modalStyles}
      >
        <Heading>Congratulations!</Heading>
        <Paragraph>Your NFT has been successfully minted!</Paragraph>
        {txId && tokenId ? (
          <>
            <SmallParagraph>
              Transaction ID:{' '}
              <TxLink
                href={`https://basescan.org/tx/${txId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txId.slice(0, 10)}...{txId.slice(-10)}
              </TxLink>
            </SmallParagraph>
            <OpenSeaLink
              href={`https://opensea.io/assets/base/${NFT_CONTRACT_ADDRESS}/${tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on OpenSea
            </OpenSeaLink>
          </>
        ) : (
          <Paragraph style={{ fontSize: '14px' }}>Loading transaction information...</Paragraph>
        )}
        <CloseBtn onClick={closeModal}>Close</CloseBtn>
      </Modal>
      {isSuccess && <Confetti />}
    </>
  );
};

export default MintButton;
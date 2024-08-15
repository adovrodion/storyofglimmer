import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';
import connectButtonImage from '../assets/connect-button.png';
import { base } from 'wagmi/chains';

const StyledConnectButton = styled(ConnectButton)`
  background: url(${connectButtonImage}) no-repeat center center;
  background-size: contain;
  width: 300px;
  height: 90px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const CustomConnectButton = () => {
  return (
    <StyledConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
  if (!connected) {
    return (
      <button onClick={openConnectModal} type="button" style={{ 
        width: '300px', 
        height: '90px', 
        background: `url(${connectButtonImage}) no-repeat center center`,
        backgroundSize: 'contain',
        border: 'none',
        cursor: 'pointer',
        fontSize: 0,
        color: 'transparent'
      }}>
        Connect Wallet
      </button>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '25px', backdropFilter: 'blur(10px)' }}>
      <button
        onClick={openChainModal}
        style={{ display: 'flex', alignItems: 'center', fontSize: '18px', background: 'none', border: 'none', color: 'black', cursor: 'pointer', fontFamily: '"Press Start 2P", cursive' }}
        type="button"
      >
        {chain.id === base.id ? (
          <>
            {chain.hasIcon && (
              <div
                style={{
                  background: chain.iconBackground,
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  overflow: 'hidden',
                  marginRight: 8,
                }}
              >
                {chain.iconUrl && (
                  <img
                    alt={chain.name ?? 'Chain icon'}
                    src={chain.iconUrl}
                    style={{ width: 24, height: 24 }}
                  />
                )}
              </div>
            )}
            {chain.name}
          </>
        ) : (
          'Switch Network'
        )}
      </button>
      <button onClick={openAccountModal} type="button" style={{ fontSize: '18px', background: 'none', border: 'none', color: 'black', cursor: 'pointer', fontFamily: '"Press Start 2P", cursive' }}>
        {account.displayName}
        {account.displayBalance
          ? ` (${account.displayBalance})`
          : ''}
      </button>
    </div>
  );
})()}
          </div>
        );
      }}
    </StyledConnectButton.Custom>
  );
};

export default CustomConnectButton;
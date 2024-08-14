import { ethers } from 'ethers';
import NFT_CONTRACT_ABI from './ABI.json';

export const NFT_CONTRACT_ADDRESS = '0x3ebee2bbde8d0de5fe2c1080104241197ff0e1c7';
export { NFT_CONTRACT_ABI };

export const getContract = (provider) => {
  return new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
};
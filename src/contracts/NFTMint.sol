// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Glimmer NFT contract with capped supply
/// @notice Simplified ERC-721 with single TOKEN_URI and pause + supply cap
contract Glimmer is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    /// @dev Maximum amount of tokens that can ever be minted.
    uint256 public constant MAX_SUPPLY = 5000;

    string public constant TOKEN_URI = "https://ipfs.filebase.io/ipfs/QmQwV4umGApbKUta37UUTUHVLAW8oPW2LsVLwArwR2zavD";
    bool public paused = false;

    /// @notice Emitted each time a new NFT is minted.
    event Minted(address indexed to, uint256 tokenId);

    constructor(address initialOwner) 
        ERC721("Glimmer", "GL") 
        Ownable(initialOwner) 
    {}

    modifier whenNotPaused() {
        require(!paused, "Minting is paused");
        _;
    }

    function safeMint(address to) public whenNotPaused {
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);

        emit Minted(to, tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setPaused(bool _paused) public onlyOwner {
        paused = _paused;
    }
}
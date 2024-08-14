// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Glimmer is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string public constant TOKEN_URI = "https://ipfs.filebase.io/ipfs/QmQwV4umGApbKUta37UUTUHVLAW8oPW2LsVLwArwR2zavD";
    bool public paused = false;

    constructor(address initialOwner) 
        ERC721("Glimmer", "GL") 
        Ownable(initialOwner) 
    {}

    modifier whenNotPaused() {
        require(!paused, "Minting is paused");
        _;
    }

    function safeMint(address to) public whenNotPaused nonReentrant {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setPaused(bool _paused) public onlyOwner {
        paused = _paused;
    }
}
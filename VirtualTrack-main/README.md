# VirtualTrack

Code snippets and supporting documentations for the **VirtualTrack** project built on Matic, Ethereum and Portis by *Akshit* .


Blockchain has the potential to revolutionize the Legal industry, we have worked on two potential areas where this technology can streamline legal work and enhance- transparency, authenticity, security, and immutability. 

1. Smart contracts
* Authenticity
A legally binding contract consists of signing authority, lawyers, and parties involved. All of them have to register at the platform with government-approved documents, which strengthens the authentic quotient of our project. After drafting and validation of the contract, the signing authority signs the contract and is reflected on the blockchain. 
* Transparency and security
Information in the contract will be visible to all the authorized members of the blockchain. 

2. Chain of custody 
* Immutability
Evidence should not be altered during the investigation, in order to be admissible in a legal court process. guaranteeing auditable integrity of the collected evidence i.e. Nobody can alter/ tamper with the evidence
* Traceability 
Tracing a piece of evidence would be easier and less time consuming as every record is time-stamped, facilitating speedy judgments. 


## Instructions to run the project locally 
1. Go into the root folder of the project, named `SupplyChain` and run `npm install`.
2. Inside the root folder, run `truffle compile` to compile the Solidity smart contract to their JSON ABIs.
3. Run `truffle migrate --reset --network matic` to migrate the smart contracts to the Matic Mumbai test network or `truffle migrate --reset --network ropsten` to migrate to the Ropsten Test Network.
4. After migration, run `npm start` to start the Web Application.

Note: If you want to use your own account to deploy the contracts, open the `.secret` file and enter your mnemonic. To get the mnemonic of your account, you can go to Account Settings on Metamask or Export Account on Portis.

Note: If you decide to deploy using your personal account, ensure that there are enough MATIC/ETH tokens in your account. You can request tokens using the publically available [faucet for the Matic Mumbai network](https://faucet.matic.network/) or [faucets for the Ropsten network](https://faucet.ropsten.be/).



## Tech Stack:
* Smart Contracts: [Solidity](https://solidity.readthedocs.io/en/v0.7.3/)
* Wallet Integration: [Portis](https://www.portis.io/)
* Blockchain Network: [Matic](https://matic.network/) and [Ethereum Ropsten Test Network](https://ethereum.org/en/developers/docs/networks/)
* Front-end: [React](https://reactjs.org/)
* Package Manager: [npm](https://www.npmjs.com/)


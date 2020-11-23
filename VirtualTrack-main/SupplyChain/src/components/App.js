import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SupplyChain from '../abis/SupplyChain.json'
import Navbar from './Navbar'
import Main from './Main'
import Portis from '@portis/web3';
const web3_utils = require('web3-utils');
const ecies = require("eth-ecies");


class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const portis = new Portis('a91380fd-90e9-4b1e-9d82-b22a377e9ca9', 'ropsten');
    const web3 = new Web3(portis.provider);
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = SupplyChain.networks[networkId]
    if(networkData) {
      const supplyChain = web3.eth.Contract(SupplyChain.abi, networkData.address)
      this.setState({ supplyChain })
      const contractCount = await supplyChain.methods.contractCount().call()

      this.setState({ contractCount })

      // Load Contracts
      for (var i = 1; i <= contractCount; i++) {
        const contract = await supplyChain.methods.contracts(i).call()
        console.log("Contract: ")
        console.log(contract)
        this.setState({
          contracts: [...this.state.contracts, contract]
        })
      }

      // Load Next
      for (var i = 1; i <= contractCount; i++) {
        const contractNext = await supplyChain.methods.contractNext(i).call()
        console.log(contractNext)
      }
      
      // Sort contract. Show highest valued contract first
      this.setState({
        contracts: this.state.contracts.sort((a,b) => b.linkedAmount - a.linkedAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('SupplyChain contract not deployed to detected network.')
    }
  }

  createContract(content, value, next, end) {
    this.setState({ loading: true })
    this.state.supplyChain.methods.createContract(content, next, end).send({ from: this.state.account, value: web3_utils.toWei(value, "ether") })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
  }

  moveContract(id, next) {
    console.log(next)
    this.setState({ loading: true })
    this.state.supplyChain.methods.moveContract(id, next).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      try {
        this.setState({ loading: false })
        console.log(this.state.loading)
      } catch (e) {
        window.alert("You are not eligible to move this contract.");
        this.setState({ loading: false })
      }
    }).catch(e => {
      window.alert("Transaction signed. Please check your wallet for status.");
      this.setState({ loading: false })
  });
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      supplyChain: null, 
      contractCount: 0,
      contracts: [],
      loading: true,
    }

    this.createContract = this.createContract.bind(this)
    this.moveContract = this.moveContract.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              contracts={this.state.contracts}
              createContract={this.createContract}
              moveContract={this.moveContract}
            />
        }
      </div>
    );
  }
}

export default App;

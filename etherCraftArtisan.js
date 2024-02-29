// etherCraftArtisan.js
const Web3 = require('web3');
const _ = require('lodash');
const axios = require('axios');
const { abi, evm } = require('./SimpleContract.json'); // Assume SimpleContract.json contains your contract ABI and bytecode

class EtherCraftArtisan {
  constructor() {
    this.web3 = new Web3();
  }

  async craftContract() {
    const accounts = await this.web3.eth.getAccounts();

    const contractArtisan = new this.web3.eth.Contract(abi);

    const craftTransaction = contractArtisan.deploy({
      data: evm.bytecode.object,
      arguments: [123] // Example constructor argument
    });

    const gasEstimate = await craftTransaction.estimateGas();

    const craftedContract = await craftTransaction.send({
      from: accounts[0],
      gas: gasEstimate
    });

    return craftedContract.options.address;
  }

  async interactWithContract(contractAddress) {
    const contractArtisan = new this.web3.eth.Contract(abi, contractAddress);

    // Example: Call a method on the contract
    const result = await contractArtisan.methods.getValue().call();

    return result;
  }
}

module.exports = EtherCraftArtisan;

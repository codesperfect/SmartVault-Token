const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3'); 
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

const provider = new HDWalletProvider(
    'dance evidence cheese absorb example inform about cup owner olympic scrub cake',
    'https://sepolia.infura.io/v3/515f3227a3b54b1896ce5fe60e7f4992'
);


const web3 = new Web3(provider);
provider.setMaxListeners(300);

const abiPath = path.resolve(__dirname,'bin','SmartVaultToken.abi');
const abi = fs.readFileSync(abiPath,'utf-8');

const bytecodePath = path.resolve(__dirname,'bin','SmartVaultToken.bin');
const bytecode = fs.readFileSync(bytecodePath,'utf-8');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(abi)).deploy({data:bytecode}).send({from:accounts[0],gas:'4000000'}); 
    console.log('Contract deployed to ',result.options.address);
    exit(0);
}

deploy();
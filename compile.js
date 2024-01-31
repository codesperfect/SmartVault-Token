const path = require('path');
const fs = require('fs')
const solc = require('solc');

const smartvaultTokenPath = path.resolve(__dirname,'contract','SmartVaultToken.sol'); 
const source = fs.readFileSync(smartvaultTokenPath, 'utf-8');

var input = {
    language : 'Solidity',
    sources: {
        'SmartVaultToken.sol':{
            content:source
        }
    },
    settings:{
        outputSelection: {
            '*':{
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['SmartVaultToken.sol']['SmartVaultToken'];

var dirName = 'bin';
const contractByteCodePath = path.join(dirName,'SmartVaultToken.bin');
fs.writeFileSync(contractByteCodePath,contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName,'SmartVaultToken.abi');
fs.writeFileSync(contractAbiPath,JSON.stringify(contract.abi));

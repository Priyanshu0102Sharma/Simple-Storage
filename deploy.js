// const { TransactionForkEvent } = require('@ethersproject/abstract-provider');
const ethers = require('ethers')
const fs = require("fs")
require("dotenv").config();

async function main() {
    // compile them in our code
    // compiler them seperately
    // HTTP://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")
    const contactFactory= new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying Pls wait......");
    const contract = await contactFactory.deploy();
    // console.log(contract);
// const deploymentReceipt = await contract.deployTransaction.wait(1);
// console.log(deploymentReceipt);
const currentFavNumber = await contract.retrieve();
console.log(`Current Favorite number is ${currentFavNumber}`);

const trasactionResponse = await contract.store(7);

const transactionScript = await trasactionResponse.wait(1);
const favNumber= await contract.retrieve();
console.log(`Updated Value: ${favNumber}`);


}


main().then(() => {
process.exit(0);
}).catch((err) => {
console.log(err);
})
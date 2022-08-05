const { ethers } = require("ethers");
require("dotenv").config();

const env = process.env;

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PUBLIC_KEY = env.PUBLIC_KEY;
const PRIVATE_KEY = env.PRIVATE_KEY;
const PROVIDER_URL = "http://localhost:8545";

async function viewNFT() {
  const provider = ethers.getDefaultProvider(PROVIDER_URL);
  const contractJson = require("../artifacts/contracts/MinimalNFT.sol/MinimalNFT.json");
  const abi = contractJson.abi;
  const contractInstance = new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    // signer
    provider
  );
  contractInstance.balanceOf(PUBLIC_KEY).then((r) => console.log(Number(r)));
}

viewNFT();

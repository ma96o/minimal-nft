import { ethers } from "ethers";

const CONTRACT_ADDRESS = "";
const PUBLIC_KEY = "";
const PRIVATE_KEY = "";
const PROVIDER_URL = "http://localhost:8545";

async function mintNFT() {
  const provider = ethers.getDefaultProvider(PROVIDER_URL);
  const contract = require("../artifacts/contracts/MinimalNFT.sol/MinimalNFT.json");
  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    provider
  );
}

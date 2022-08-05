// import { ethers } from "ethers";
const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROVIDER_URL = "http://localhost:8545";

async function mintNFT() {
  const provider = ethers.getDefaultProvider(PROVIDER_URL);
  const signer = provider.getSigner();
  const contract = require("../artifacts/contracts/MinimalNFT.sol/MinimalNFT.json");
  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    signer
    // provider
  );

  const nonce = await provider.getTransactionCount(PUBLIC_KEY, "latest");
  const tx = {
    nonce,
    gasPrice: 500000,
    data: nftContract.methods.mint(PUBLIC_KEY).encodeABI(),
  };

  const signPromise = signer.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      const tx = signedTx.rawTransaction;
      if (tx !== undefined) {
        signer.sendTransaction(tx, function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ", hash);
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        });
      }
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });
}

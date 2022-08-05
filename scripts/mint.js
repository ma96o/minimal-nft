// import { ethers } from "ethers";
const { ethers } = require("ethers");
require("dotenv").config();

const env = process.env;

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const PUBLIC_KEY = env.PUBLIC_KEY;
const PRIVATE_KEY = env.PRIVATE_KEY;
const PROVIDER_URL = "http://localhost:8545";

async function mintNFT() {
  try {
    const provider = ethers.getDefaultProvider(PROVIDER_URL);
    const signer = provider.getSigner();
    const contractJson = require("../artifacts/contracts/MinimalNFT.sol/MinimalNFT.json");
    const abi = contractJson.abi;
    // const iface = new ethers.utils.interface(abi);
    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
      // provider
    );
    const gasPrice = 400000;
    const gasLimit = 500000;
    const wallet = await new ethers.Wallet(PRIVATE_KEY, provider);

    const nonce = await signer.getTransactionCount();
    const tx = {
      nonce,
      //   gasLimit: "0x5208",
      gasLimit: 6721975,
      //   gasLimit: 50000,
      //   gasLimit,
      //   gasPrice,
      //   data: iface.encodeFunctionData("mint", PUBLIC_KEY),
    };
    let rawTxn = await contractInstance.populateTransaction.mint(
      PUBLIC_KEY,
      tx
    );
    const signedTxn = await wallet.sendTransaction(rawTxn);
    let reciept = (await signedTxn).wait();
    if (reciept) {
      console.log(
        "Transaction is successful!!!" + "\n" + "Transaction Hash:",
        (await signedTxn).hash +
          "\n" +
          "Block Number:" +
          (await reciept).blockNumber +
          "\n" +
          "Navigate to https://polygonscan.com/tx/" +
          (await signedTxn).hash,
        "to see your transaction"
      );
    } else {
      console.log("Error submitting transaction");
    }
  } catch (e) {
    console.log("error mint()", e);
  }

  //   const signPromise = signer.signTransaction(tx, PRIVATE_KEY);
  //   signPromise
  //     .then((signedTx) => {
  //       const tx = signedTx.rawTransaction;
  //       if (tx !== undefined) {
  //         signer.sendTransaction(tx, function (err, hash) {
  //           if (!err) {
  //             console.log("The hash of your transaction is: ", hash);
  //           } else {
  //             console.log(
  //               "Something went wrong when submitting your transaction:",
  //               err
  //             );
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Promise failed:", err);
  //     });
}

mintNFT();

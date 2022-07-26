import Web3 from "web3";
import ABI from "../ABI.json"
import Web3Utils from 'web3-utils';
import { Utils } from "web3-utils";
import { ethers } from "ethers";

const web3 = new Web3(window.ethereum)

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const Sign = async (account, tokenURi, amount) => {
  let message = ethers.utils.solidityPack(
    ["address", "uint256", "string", "address", "uint256"],
    ["0x4d1FC9702Df160A5f91ba968FC084fb014112649", 0, tokenURi, "0xc778417E063141139Fce010982780140Aa0cD5Ab", amount]
  );
  let messageHash = ethers.utils.keccak256(message);
  let sign = await web3.eth.sign(messageHash, account);

  console.log(sign);


  return sign;
};
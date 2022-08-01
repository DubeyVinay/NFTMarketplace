import Web3 from "web3";
import Web3Utils from 'web3-utils';
import { Utils } from "web3-utils";
import { ethers } from "ethers";
import marketplaceAbi from "./ABI.json"
import erc721Abi from "./erc721Abi.json"
import wethAbi from "./wethAbi.json"

const web3 = new Web3(window.ethereum)

const marketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
const wethAddress = process.env.REACT_APP_WETH_ADDRESS;
const erc721Address = process.env.REACT_APP_ERC721_ADDRESS

let marketplace = new web3.eth.Contract(marketplaceAbi, marketPlaceAddress);
let weth = new web3.eth.Contract(wethAbi, wethAddress);
let erc721 = new web3.eth.Contract(erc721Abi, erc721Address);

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

export const Sign = async (account,nft_address,token_id,weth_address, tokenURi, amount) => {
  let message = ethers.utils.solidityPack(
    ["address", "uint256", "string", "address", "uint256"],
    [nft_address, token_id, tokenURi,weth_address, amount]
  );
  let messageHash = ethers.utils.keccak256(message);
  let sign = await web3.eth.personal.sign(messageHash, account);

  console.log(sign);


  return sign;
};

export const LazyBuy = async (lazyBuySellerArgs) =>{

  let account = await web3.eth.getAccounts();

  await marketplace.methods.lazyBuy(lazyBuySellerArgs).send({ from: account[0]});


}

export const SetApprovalForAll = async (status,account) =>{

 await erc721.methods.setApprovalForAll(marketPlaceAddress, status).send({from:account});

}

export const SetApprove = async (amount,account) =>{
 await weth.methods.approve(marketPlaceAddress,amount).send({from:account});
 
}

export const Allowance  = async (account,marketPlaceAddress) =>{
 let allowance=  await weth.methods.allowance(account,marketPlaceAddress).call();
 
 return allowance;
 }

 export const IsApprovalForAll  = async (account) =>{
  let isApporve = await weth.methods.allowance(marketPlaceAddress,account).call();
  return isApporve;
 }
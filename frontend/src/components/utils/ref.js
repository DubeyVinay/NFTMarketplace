
import Web3 from 'web3';
import pale721abi from './constant/pale721.json';
import pale1155abi from './constant/pale1155.json';

import tradeabi from './constant/trade.json';

import {useEffect} from 'react'

function App() {


let web3;
let accounts
let contract
let contract1155
let tradeContract
let signature
  const web3Connect =async ()=>{
   accounts = await window.ethereum.enable()
   web3 = new Web3(window.ethereum)
   contract = new web3.eth.Contract(pale721abi.abi,"0x20D4ECD2d7eC08dAF4672a3F571b5F3BA4D12Bb9")
   contract1155 = new web3.eth.Contract(pale1155abi.abi,"0x1622f1ca8e6311a15e4E23Beb322aa5253A9996C")
   tradeContract = new web3.eth.Contract(tradeabi.abi,"0xd055582D79f4f7FD407c990006e365105A96101E")
  }

  let voucher ;
 let creator;
 let fee;
 let supply;

  const createVoucher = async (tokenUri,account) => {
    
    // const voucher = { tokenId, tokenUri, minPrice }
    const account = window.ethereum.selectedAddress
    // const hash = await contract.methods
    //   .getMessageHash(_nonce, minPrice, tokenUri)
    //   .call()

     let whiteListedOrNot = await contract.methods.isWhiteList(account).call()
     
      if(whiteListedOrNot){
        signature = await web3.eth.personal.sign(web3.utils.soliditySha3("0x20D4ECD2d7eC08dAF4672a3F571b5F3BA4D12Bb9",tokenUri), account)
      }
      else{
        alert("user is not white listed")
      }

    console.log('signature', signature)
    splitSign(signature)
    
    // const encodedhash = await contract.methods
    // .getEthSignedMessageHash(hash)
    // .call()
    
    // const verifyingaddress = await contract.methods
    //    .recoverSigner(encodedhash, signature)
    //   .call()

    // console.log('verifyingaddress', verifyingaddress)
    // voucher=[_nonce, minPrice, tokenUri,signature,royality]
    // creator =verifyingaddress
    // fee = minPrice
  
  }

  function splitSign(sign) {
    sign = sign.slice(2)
    var r = `0x${sign.slice(0, 64)}`
    var s = `0x${sign.slice(64, 128)}`
    var v = web3.utils.toDecimal(`0x${sign.slice(128, 130)}`)

    console.log("v,r,s",v,r,s)
    return [v, r, s]
  }

  // const createVoucher1155 = async (_nonce, minPrice, tokenUri, royality,_supply) => {
  const createVoucher1155 = async (tokenUri) => { 
    // const voucher = { tokenId, tokenUri, minPrice }
    const account = window.ethereum.selectedAddress
    // const hash = await contract1155.methods
    //   .getMessageHash(_nonce, minPrice, tokenUri)
    //   .call()
  

    let whiteListedOrNot = await contract1155.methods.isWhiteList(account).call()
     
    if(whiteListedOrNot){
      signature = await web3.eth.personal.sign(web3.utils.soliditySha3("0x1622f1ca8e6311a15e4E23Beb322aa5253A9996C",tokenUri), account)
    }
    else{
      alert("user is not white listed")
    }

    console.log('signature', signature)
    splitSign(signature)
    
    // const encodedhash = await contract1155.methods
    // .getEthSignedMessageHash(hash)
    // .call()
    
    // const verifyingaddress = await contract1155.methods
    //    .recoverSigner(encodedhash, signature)
    //   .call()

    // console.log('verifyingaddress', verifyingaddress)
    // voucher=[_nonce, minPrice, tokenUri,signature,royality,_supply]
    // creator =verifyingaddress
    // fee = minPrice
    // supply=_supply
  
  }

  const LazyMint= async (tokenUri,fee)=>{
    debugger
    const account = window.ethereum.selectedAddress

    let tx = await contract.methods.createCollectible(tokenUri,fee,signature).send({from:account,value:fee})
  console.log(tx)
  }

  const LazyMint1155= async (creator,voucher,fee,supply)=>{
    debugger
    const account = window.ethereum.selectedAddress

    let tx = await contract1155.methods.LazyMint(creator,voucher,supply).send({from:account,value:fee*2})
  console.log(tx)
  }
  useEffect(
    () => {
      web3Connect()

    },
    [],
  );

   async function Order(assetAddress, tokenId, payingTokenAddress,amount) {
      try {
        debugger
        if (tokenId == null) {
          tokenId = "";
        }

        console.log(assetAddress, tokenId, amount, payingTokenAddress)

        var amountInDec = web3.utils.toWei(amount,'ether')
        console.log(amountInDec)

        var messageHash = web3.utils.soliditySha3(assetAddress, tokenId, payingTokenAddress, amountInDec);
        console.log(messageHash)

        
        var account = window.ethereum.selectedAddress
        const signature = await web3.eth.personal.sign(messageHash, account);
        console.log(signature)
            

        
      } catch (err) {
        console.error(err);
      }
    
  }
  return (
    <div className="App">
     
         <button onClick={()=>{
          LazyMint("bafybeib6ytyfd6z6voot65pltawz5kv36dauuiifonv5meh4erth5kokda",1000)
        }}>
          LazyMint
        </button>  <button onClick={()=>{
          createVoucher("bafybeib6ytyfd6z6voot65pltawz5kv36dauuiifonv5meh4erth5kokda")
        }}>
          createVoucher
        </button>

        <button onClick={()=>{
          Order("0xF6FB0d624E596efb562986AfE21777cc37e9e9e1",1,"0xc778417E063141139Fce010982780140Aa0cD5Ab",'0.1')
        }}> Order</button>

        <button onClick={()=>{
          LazyMint1155(creator,voucher,fee,supply)
        }}>
          LazyMint1155
        </button>  <button onClick={()=>{
          createVoucher1155("bafybeib6ytyfd6z6voot65pltawz5kv36dauuiifonv5meh4erth5kokda")
        }}>
          createVoucher1155
        </button>

        
      
    
    </div>
  );
}

export default App;




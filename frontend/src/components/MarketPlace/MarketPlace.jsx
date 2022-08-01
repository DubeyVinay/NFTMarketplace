import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFlateSale } from "../ApiCalls/FixedPriceApi";
import Gallary from 'react-bootstrap'
import NftForm from "../NftForm/NftForm";
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../MarketPlace/Market-place.css'
import { Button } from "react-bootstrap"
import Web3 from "web3";
import { LazyBuy,Allowance,SetApprove } from "../utils/utils";

import { useWeb3React } from "@web3-react/core";

const marketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
const wethAddress = process.env.REACT_APP_WETH_ADDRESS;
const erc721Address = process.env.REACT_APP_ERC721_ADDRESS;

const FixedPriceNfts = () => {
  const [formData, setFormData] = useState([]);
  let web3 = new Web3(window.ethereum);
  const { account, library } = useWeb3React();
  

  

  

  useEffect(() => {
    
    getNFTs();
  }, []);


  // let signature  = SignLazybuyData()


 

  const getNFTs = async () => {
    const data = await getFlateSale();
    console.log("Data in FixedPriceNFTs", data.data);
    // debugger
    const res = data.data;
    setFormData(res)
  }

  let lazyBuySellerArgs ;

  const getNFT = async() =>{
 
  }


    // const isApporveForAll =()
  const FlatBuy = async () => {
    const data = await getFlateSale();
 const res = data.data;

//  let account = await web3.eth.getAccounts();
    { formData.map((item) =>(

      lazyBuySellerArgs = [
        1,
        account,
        erc721Address,
         wethAddress,
        item?.token_id,
        item?.royalty,
        item?.sale_amount,
        item?.signature,
        item?.uri,
        0,
        0
      ]
      
    ))
    // [
    //   nonce,
    //   buyer.address,
    //   myNFT.address,
    //   weth.address,
    //   "1",
    //   "400",
    //   200,
    //   sign,
    //   "abhi",
    //   block.timestamp,
    //   block.timestamp + 100,
    // ]
     

  }
    
    // if isAppforAll(erc721) ==true && alllwaqnce(weth) => amonut ) /else { apporve(weth)}
    debugger
    let allownce = await Allowance(account,marketPlaceAddress)
     if(allownce >= lazyBuySellerArgs[6]){

       await LazyBuy(lazyBuySellerArgs);
     }
     else{
      await SetApprove(lazyBuySellerArgs[6],account)
     
     }

    console.log("Lazy Buy Contract Instance",lazyBuySellerArgs);
    
  }


  console.log("bbbbb",erc721Address);

  return (

    <div className="nfts">
      <h2>Explore</h2>

      <Carousel>
        {
          formData.map((item) => (
            <>
              {/* Name : {item?.nft__name}  <br/>
    <img src={item.uri} alt="" /> */}
              <div id={item?._id} className="slide_item">
                <img src={item?.Imguri} alt="" />
                <p>{item?.nft__name}</p>
                <p>{item?.sale_amount}</p>
                <p></p>
                <br />
              </div>

              <Button data-item-id={item?._id} onClick={FlatBuy}>Buy</Button>
            </>
          ))
        }
      </Carousel>
    </div>
  )


};

export default FixedPriceNfts;

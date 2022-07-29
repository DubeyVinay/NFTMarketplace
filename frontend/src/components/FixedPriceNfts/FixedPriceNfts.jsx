import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFlateSale } from "../ApiCalls/FixedPriceApi";
import Gallary from 'react-bootstrap'
import NftForm from "../NftForm/NftForm";
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../FixedPriceNfts/FixedPriceNfts.css'
import {Button} from "react-bootstrap"
import Web3 from "web3";
import flateSaleAbi from "../ABI.json"

const newContract = "0xDaa6D0daDC8Ba60349D33bbD6BcABbe568D837d1";
const FixedPriceNfts = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getNFTs();
  },[]);

  const getNFTs = async () =>{
    

    const data = await getFlateSale();
    console.log("Data in FixedPriceNFTs", data.data);
    // debugger
    const res = data.data;
    setFormData(res)
  }

  const connectToContract = async () =>
  {
    let web3 = new Web3(window.ethereum);
    // let account = await window.ethereum.enable();

    let contract = new web3.eth.Contract(flateSaleAbi,newContract);

    console.log("Lazy Buy Contract Instance",contract);
  }


  

  return(

    <div className="nfts">
      <h2>Explore</h2>

    <Carousel>
{
  formData.map((item)=>(
    <>
    {/* Name : {item?.nft__name}  <br/>
    <img src={item.uri} alt="" /> */}
    <div className="slide_item">
      <img src={item?.Imguri} alt="" />
      <p>{item?.nft__name}</p>
      <p>{item?.sale_amount}</p>
      <br/>
    </div>

   <Button onClick={connectToContract}>Buy</Button>
    </>
  ))
}
</Carousel>
    </div>
  ) 
  
  
};

export default FixedPriceNfts;

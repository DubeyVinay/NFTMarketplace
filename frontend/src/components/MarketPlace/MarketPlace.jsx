import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import NftForm from "../NftForm/NftForm";
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../MarketPlace/Market-place.css'
import { Button } from "react-bootstrap"
import Web3 from "web3";
import { LazyBuy, Allowance, SetApprove } from "../utils/utils";

import { useWeb3React } from "@web3-react/core";
import Card from 'react-bootstrap/Card';
import { ethers } from "ethers";
import { getMarketplaceNFT } from "../ApiCalls/MarketplaceApi"
import NFTDetail from "../../pages/NFTDetail"

const marketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
const wethAddress = process.env.REACT_APP_WETH_ADDRESS;
const erc721Address = process.env.REACT_APP_ERC721_ADDRESS;


const MarketPlace = () => {
  const [formData, setFormData] = useState([]);
  let web3 = new Web3(window.ethereum);
  const { account, library } = useWeb3React();



  useEffect(() => {

    getNFTs();
  }, []);


  // let signature  = SignLazybuyData()




  const getNFTs = async () => {
    const data = await getMarketplaceNFT();
    console.log("Data in FixedPriceNFTs", data.data);
    // debugger
    const res = data.data;
    setFormData(res)
    console.log(res, "resssss");
  }

  let lazyBuySellerArgs;

  // const isApporveForAll =()
  const FlatBuy = async () => {
    const data = await getMarketplaceNFT();
    const res = data.data;


    //  let account = await web3.eth.getAccounts();
    {
      formData.map((item) => (

        lazyBuySellerArgs = [
          item.nonce,
          account,
          erc721Address,
          wethAddress,
          item?.token_id,
          ethers.BigNumber.from(item?.royalty),
          ethers.BigNumber.from(item?.sale_amount),
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

    let allownce = await Allowance(account, marketPlaceAddress)
    if (allownce >= lazyBuySellerArgs[6]) {

      await LazyBuy(lazyBuySellerArgs);
    }
    else {
      await SetApprove(lazyBuySellerArgs[6], account)
      await LazyBuy(lazyBuySellerArgs);


    }

    console.log("Lazy Buy Contract Instance", lazyBuySellerArgs);


  }

  formData.filter(items => items.sale_type.includes('auction')).map(item => (
   console.log(">>>>>>",item)
  ))


  console.log("bbbbb", erc721Address);

  return (

    <div className="nfts">
      <h2>Explore</h2>

      <Carousel>
        {
          formData.map((item) => (
            <>
            <div key={item?._id}>
              <a href={`/NFTDetail/${item._id}`}>
                <Card style={{ width: '18rem' }}>

                  <Card.Img variant="top" src={item?.Imguri} alt="NFT" />
                  <Card.Body>
                    <Card.Title>{item?.nft__name}</Card.Title>
                    <Card.Text>
                      {item?.sale_amount}
                    </Card.Text>

                  </Card.Body>

                </Card>
              </a>
              </div>


            </>
          ))
        }
      </Carousel>
      <div className="auctionButton">
        <Button href="/market">See All</Button>
        </div>

      {/* Fixed Price NFTS */}
      <div className="fixedPriceNft" alignItems="flex-end">

        <h2>Fixed Price NFTs</h2>

        <Carousel>
          {
            formData.filter(items => items.sale_type.includes('fix')).map(item => (
              <a href={`/NFTDetail/${item?._id}`} >
                

              <Card style={{ width: '18rem' }}>

                <Card.Img variant="top" src={item?.Imguri} alt="NFT" />
                <Card.Body>
                  <Card.Title>{item?.nft__name}</Card.Title>
                  <Card.Text>
                    {item?.sale_type}
                  </Card.Text>

                </Card.Body>

              </Card>
              </a>
            ))

          }

        </Carousel>

        <div className="auctionButton">
        <Button href="/market">See All</Button>
        </div>

      </div>

      {/* Auction Price NFTS */}

      <div className="auctionPriceNft">
        <h2>Auction Price NFT</h2>

        <Carousel>
          {
            formData.filter(items => items.sale_type.includes('auction')).map(item => (
              <a href={`/NFTDetail/${item._id}`}>

              <Card style={{ width: '18rem' }}>

                <Card.Img variant="top" src={item?.Imguri} alt="NFT" />
                <Card.Body>
                  <Card.Title>{item?.nft__name}</Card.Title>
                  <Card.Text>
                    {item?.sale_type}
                  </Card.Text>

                </Card.Body>

              </Card>
              </a>
            ))

          }

        </Carousel>
        <div className="auctionButton">
        <Button href="/market">See All</Button>
        </div>
      </div>
    </div>
  )


};

export default MarketPlace;

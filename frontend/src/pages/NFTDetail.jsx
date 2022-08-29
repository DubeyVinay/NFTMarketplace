import React from 'react'
import { useState, useRef } from 'react'
import { useEffect } from 'react'


import { useParams } from 'react-router-dom'
import { getNFTDetail } from '../components/ApiCalls/MarketplaceApi'
import { Col, Container } from 'reactstrap'
import "./NFTDetail.css"
import { ethers } from "ethers";
import { LazyBuy, Allowance, SetApprove ,Deposit,BalanceOf} from "../components/utils/utils";
import { useWeb3React } from '@web3-react/core'
import { Form, Button } from "react-bootstrap"
import { buyerSign, LazyAuction } from '../components/utils/utils'

import { updateBidDetail } from '../components/ApiCalls/MarketplaceApi';
import {updateBuyerDetails} from '../components/ApiCalls/MarketplaceApi';


const marketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
const wethAddress = process.env.REACT_APP_WETH_ADDRESS;
const erc721Address = process.env.REACT_APP_ERC721_ADDRESS;

const NFTDetail = () => {

  const [nftData, setNftData] = useState([]);
  const [input, setInput] = useState();
  const { id } = useParams();
  const { account } = useWeb3React();
  const [auctionEnd, setAuctionEnd] = useState();
  const [days,setDays] = useState('00');
  const [hours,setHours] = useState('00');
  const [minutes,setMinutes] = useState('00');
  const [seconds,setSeconds] = useState('00');
  const [nftDetail, setNftDetail] = useState('');
  const [bidDetails, setBidDetails] = useState({
    bidderAddress: "",
    bidPrice: "",
    bidderSignature: "",
    bidTime: "",
  });

 
  useEffect(() => {

    getNFT();
    // lazyAuction();
  }, []);

  let count = 0;

  const handleChange = (e) => {


    const name = e.target.name;
    const value = e.target.value;

    setBidDetails({ ...bidDetails, [name]: value });
    
    



  };

  const getNFT = async () => {
    const data = await getNFTDetail(id);
    const res = data.data
    setNftData(res)

  }

  //LazyBuy

  let lazyBuySellerArgs;

  // const isApporveForAll =()
  const FlatBuy = async () => {
    debugger
    //  let account = await web3.eth.getAccounts();
    {

      

      lazyBuySellerArgs = [
        nftData?.nonce,
       nftData?.seller_address,
        erc721Address,
        wethAddress,
        nftData?.token_id,
        nftData?.royalty,
        nftData?.sale_amount,
        nftData?.signature,
        nftData?.uri,
        0,
        0
      ]
      


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
    
    if(await BalanceOf(account)>=nftData.sale_amount){

      if (allownce >= lazyBuySellerArgs[6]) {

        const result = await LazyBuy(lazyBuySellerArgs);
        
          setNftDetail(account);
  
         updateBuyerDetails(id,nftDetail);
  
        
        console.log("result",result);
  
        
        
      }
      else {
        await SetApprove(lazyBuySellerArgs[6], account)
        await LazyBuy(lazyBuySellerArgs);
      }
      
    }else{
      await Deposit(lazyBuySellerArgs[6].toString(), account);
      // await Deposit(ethers.utils.formatEther(lazyBuySellerArgs[6]), account);



    }
    
  }

  //LazyAuction



  var cDate = nftData.end_time;

  var countDownDate = new Date(cDate).getTime();


  var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    var timeLeft = distance;
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    
      

    // If the count down is over, write some text 
    if (timeLeft < 0) {
      count++;
      clearInterval(x);
      
      setAuctionEnd(true);

     

    }
    else{
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  }, 1000);

  let Signature;
  let _accounts;
  let bidTime = Math.floor(Date.now() / 1000);
  
  
  const auctionSale = async () => {
    
    

    if (bidDetails.bidPrice > nftData.bidPrice) {
      _accounts = account
      Signature = await buyerSign(_accounts,bidDetails?.bidPrice,bidTime);
      console.log("buyer sign", Signature);

      bidDetails.bidderAddress = account;
      bidDetails.bidderSignature = Signature;
      bidDetails.bidTime = bidTime;

      await updateBidDetail(id, bidDetails);
    
      

    }
    else {
      alert("Enter Correct Amount");
    }

  }

  const lazyAuction = async () => {
    debugger
    let sTime =nftData?.start_time;
    let startingTime = new Date(sTime).getTime()
    
   console.log("account",startingTime);
  
    if(account == nftData.bidderAddress)
    {
      
      let lazyAuctionSellerArgs = [
        nftData?.nonce,
        nftData?.seller_address,
        erc721Address,
        wethAddress,
        nftData?.token_id,
        nftData?.royalty,
        nftData?.starting_amount,
       nftData?.signature,
        nftData?.uri,
        startingTime,
        countDownDate
      ];

      let bidderAgrs = [
        account, nftData?.bidPrice, nftData?.bidderSignature,bidTime
      ];

      let allownce = await Allowance(account, marketPlaceAddress)
      if (allownce >= lazyAuctionSellerArgs[6]) {
        
        await LazyAuction(lazyAuctionSellerArgs, bidderAgrs);
      }
      else {
        await SetApprove(lazyAuctionSellerArgs[6], account)
        // await LazyAuction(lazyAuctionSellerArgs);


      }
    }
    else{
      alert("You loose the bid!")
    }

   

    
    
      
    
  
}

  return (

    <>
      <div className='nft_detail'>
        <Container style={{ display: "flex" }}>
          <Col lg="6" md="6" style={{ textAlign: "center" }}>
            <img src={nftData?.Imguri} style={{ width: "75%" }} />
          </Col>
          <Col lg="6" md="6">
            <div className="nft_title">
              <h2>{nftData?.nft__name}</h2><br />
              <p>{nftData?.nft__Description}</p>
              <p>{nftData?.sale_amount}</p>

              

            </div>

            {
              nftData?.sale_type === "fix" ? (<div className="buy_btn">

                <Button onClick={FlatBuy} >Buy Now</Button>
              </div>) : (
                <>


                  {/* <div>
                  <DateCountdown dateTo='January 01, 2023 00:00:00 GMT+03:00' callback={()=>alert('Hello')}  />
                  </div> */}
                  <p>Start Price {nftData?.starting_amount}</p>
              <p>Reserve Price {nftData?.reserve_amount}</p>
              <p>Last Bid {nftData?.bidPrice}</p>
                  <div className="timer">

                   
                    <p>{days} Days</p>
                    <p>{hours} Hours</p>
                    <p>{minutes} Minutes</p>
                    <p>{seconds} Seconds</p>

                  </div>
                  <br />

            {
              !auctionEnd ? (
                <div className="buy_btn">
                <Form.Control
                  type="number"
                  name="bidPrice"
                  value={bidDetails.bidPrice}

                  onChange={handleChange}
                />
                <br />

                <Button onClick={auctionSale} >Bid Now</Button>
              </div>
              ) : 
              (
                <>
              <h2>Auction Has Ended</h2>
                  <Button onClick={lazyAuction}>Claim Now</Button>

                  </>
              )
            }
                
                </>
              )
            }


          </Col>

        </Container>
      </div>
    </>
  )
}

export default NFTDetail
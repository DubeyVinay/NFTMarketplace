import React, { useLayoutEffect } from "react";

import { useState, useEffect, setState } from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import { createMarketplaceNFT } from "../ApiCalls/MarketplaceApi"
import { createNFT } from "../ApiCalls/NFTDetailsApi";
import axios from "axios";

import { Buffer } from "buffer";

import '../NftForm/NftForm.css'
import Switch from 'react-switch'

import { create } from 'ipfs-http-client';
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { SetApprovalForAll, Sign } from "../utils/utils"
import { Nonce, updateNonce } from "../ApiCalls/NonceApi";
import { useNavigate } from "react-router-dom"
import { errors } from "ethers";
import {useForm} from "react-hook-form";



import pinataSDK from '@pinata/sdk';



const client = create('https://ipfs.infura.io:5001/api/');


const NftForm = () => {
  let flag = 0;

  const navigate = useNavigate();

  let web3 = new Web3(window.ethereum);

  const { account, library } = useWeb3React();
  const {register, errors} = useForm(); 
  const [buffer, setBuffer] = useState(null);
  const isActive = localStorage.getItem("isActive");
  const marketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
  const wethAddress = process.env.REACT_APP_WETH_ADDRESS;
  const erc721Address = process.env.REACT_APP_ERC721_ADDRESS
  const [isSale, setIsSale] = useState(false)
  const [saleType, setSaleType] = useState()
  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const [validate,setValidate] = useState(false);
  
  const [formData, setFormData] = useState({
    nft__name: "",
    nft__Description: "",
    sale_amount: "",
    seller_address: "",
    royalty: "",
    Imguri: "",
    uri: "",
    token_id: "",
    signature: "",
    nonce: "",
    sale_type: "",
    starting_amount: "",
    reserve_amount: "",
    decline_amount: "",
    start_time: "",
    end_time: "",
    bidderAddress: "",
    bidPrice: "",
    bidderSignature: "",
    bidTime: "",


  });


  const _tokenId = 0;
  formData.token_id = _tokenId;

  //IPFS 


  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!account) {
      return alert("Please connect your wallet first.");


    }
    else {
      
      await setFormErrors(validation(formData));
      
      if (flag == 0) {
        const _json = new File([JSON.stringify(formData)], 'metadata.json');
        console.log("JSON File", _json);
  
        
  
        // initialize the form data
        const fData = new FormData()
  
        // append the file form data to 
        fData.append("file", _json)
  
        // call the keys from .env
  
        const API_KEY = "fac6b7fd3b77561f0151"
        const API_SECRET = '2b23fb1d7cfbae78e2761fd240c7199b34e53d7483b977bb9e5e14eb45b09d4f'
  
        // the endpoint needed to upload the file
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  
        const response = await axios.post(
          url,
          fData,
          {
            maxContentLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET
  
            }
          }
        )
  
        console.log("file", response.data.IpfsHash)
  
        formData.uri = response.data.IpfsHash;
  
  
        // const json_add = await client.add(_json);
        // const json_cid = json_add.path;
  
        const _nonce = await Nonce();
        const res1 = _nonce[0].nonce;
  
  
        // formData.uri = json_cid;
        formData.seller_address = account;
        formData.nonce = res1;
  
  
        console.log("Form Data", formData);
  
  
        if (isSale) {
          
          console.log("INSIDE ISSLAE");
          const _accounts = account;
          const _tokenUri = formData.uri;
          const _amount = formData.sale_amount;
  
          // console.log("Done <<<<<",done);
          // (setapporforAll(erc721))
          if (saleType == "fix") {
            formData.sale_type = saleType
            console.log("-----------", formData.sale_type);
            const Signature = await Sign(_accounts, erc721Address, _tokenId, wethAddress, _tokenUri, _amount);
            console.log("aaaaaaa", Signature);
            formData.signature = Signature;
            await createMarketplaceNFT(formData);
  
          }
          else {
            if (saleType == "auction") {
              
              const auctionAmount = formData.starting_amount
              formData.sale_type = saleType
              const Signature = await Sign(_accounts, erc721Address, _tokenId, wethAddress, _tokenUri, auctionAmount);
              console.log("aaaaaaa", Signature);
              formData.signature = Signature;
  
  
  
              await createMarketplaceNFT(formData);
  
            }
            else {
              formData.sale_type = ""
              await createMarketplaceNFT(formData);
  
            }
          }
          const done = await SetApprovalForAll(true, account);
          await createNFT(formData);
  
          await updateNonce(res1)
  
          const _nonc1e = await Nonce();
          const res = _nonc1e[0].nonce;
  
          console.log("vvbev--------", res);
  
  
        }
        else {
          await createNFT(formData);
          await updateNonce(res1)
        }
      }
      else{
      // setFormErrors(validation(formData));
      }
      
    


    }
    
    if (flag == 0) {
      navigate('/home');
    }
    console.log("flag",flag);


    console.log("Data", formData);

  };

  const getFile = async (e) => {
    const file = e.target.files[0]

    // const added = ipfs.files.add(file);
    // const cid = `https://ipfs.io/ipfs/${added.path}`
    // console.log("img cid",cid);
    // const added = await client.add(file)
    // const cid = `https://ipfs.io/ipfs/${added.path}`
    // formData.Imguri = cid;

    console.log('starting')

    // initialize the form data
    const fData = new FormData()

    // append the file form data to 
    fData.append("file", file)

    // call the keys from .env

    const API_KEY = "fac6b7fd3b77561f0151"
    const API_SECRET = '2b23fb1d7cfbae78e2761fd240c7199b34e53d7483b977bb9e5e14eb45b09d4f'

    // the endpoint needed to upload the file
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      fData,
      {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          'pinata_api_key': API_KEY,
          'pinata_secret_api_key': API_SECRET

        }
      }
    )

    const imgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`


    formData.Imguri = imgHash;



    // get the hash
    setIPFSHASH(response.data.IpfsHash);




  }

  const validation = (values) => {
    
    const errors = {}
    
    if (saleType == "auction") {
      if (!values.nft__name) {
        errors.nft__name = "NFT Name is required"
        flag++;
        
      }
      if (!values.nft__Description) {
        errors.nft__Description = "NFT Description is required"
        flag++;
        
      }
      if (!values.starting_amount) {
        errors.starting_amount = "Starting Amount is required"
        flag++;
        
      }
      if (!values.reserve_amount) {
        errors.reserve_amount = "Reserve Price is required"
        flag++;
       
      }
      else {
        if (values.reserve_amount < values.starting_amount) {
          errors.reserve_amount = "Reserve Price should be greater than starting price"
          flag++;
         
        }
      }
      if (!values.start_time) {
        errors.start_time = "Starting time is required"
        flag++;
        
      }
      if (!values.end_time) {
        errors.end_time = "End time is required"
        flag++;
        
      }
      return errors;
    }
    

    if (saleType == "fix") {
        if (!values.nft__name) {
          errors.nft__name = "NFT Name is required"
          
          flag++;
          
        }
        if (!values.nft__Description) {
          errors.nft__Description = "NFT Description is required"
          flag++;
         
        }
        
        if (!values.sale_amount) {
          errors.sale_amount = "Sale Price is required"
          flag++;
         
        }
        // return errors;
        
      }
      
        if (!values.nft__name) {
          errors.nft__name = "NFT Name is required"
          flag++;
         
        }
        if (!values.nft__Description) {
          errors.nft__Description = "NFT Description is required"
          flag++;
          
        }
        
        return errors;
        
      

      
    

    
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });

    
  };

  return (
    <Container>
      <Row>
        <div className="create__nft">
          <h2>Create NFT</h2>

          <Col lg="2"></Col>
          <Col lg="8">

            {
              account ? (<h3>{account}</h3>) : <h3>Not Connected</h3>
            }

            <Form className="align-text-center">
              <Form.Group className="mb-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control
                  type="file"
                  name="Imguri"
                  onChange={getFile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="nft__name"
                  value={formData.nft__name}
                  onChange={handleChange}
                  //ref={register({ required: true })}
                  //ref={register({required: true})}
                  
                />
              </Form.Group>

              
              <p className="_error">{formErrors.nft__name}</p>
              

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="nft__Description"
                  value={formData.nft__Description}
                  onChange={handleChange}
                />
              </Form.Group>
              <p className="_error">{formErrors.nft__Description}</p>

              <div>
                <lable>
                  Put on Sale
                </lable>
                <Switch
                  onChange={() => {
                    setIsSale(!isSale)
                  }}
                  checked={isSale}
                />
              </div>

              {
                isSale ? (

                  <div class="sale" >
                    <Form.Group className="mb-3">

                      <select name="sale_type" value="sale_type" id="saleType"
                        onChange={(e) => setSaleType(e.target.value)}
                      >
                        <option>Sale Type</option>
                        <option value="fix">Fix Sale</option>
                        <option value="auction">Auction</option>




                      </select>
                      <p className="_error">{formErrors.saleType}</p>

                      <br />


                      {
                        saleType == "fix" ? (<>
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            name="sale_amount"
                            value={formData.sale_amount}
                            onChange={handleChange}
                          />
                          <p className="_error">{formErrors.sale_amount}</p>


                        </>) : (<>
                          {
                            saleType == "auction" ? (<>
                              <Form.Group className="mb-3">
                                <Form.Label>Start Amount</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="starting_amount"
                                  value={formData.starting_amount}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                              <p className="_error">{formErrors.starting_amount}</p>



                              <Form.Label>Reserve Price</Form.Label>
                              <Form.Control
                                type="number"
                                name="reserve_amount"
                                value={formData.reserve_amount}
                                onChange={handleChange}
                              />
                              <p className="_error">{formErrors.reserve_amount}</p>


                              <Form.Label>Bid Start Time</Form.Label>
                              <Form.Control
                                type="datetime-local"

                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                              />
                              <p className="_error">{formErrors.start_time}</p>



                              <Form.Label>Bid End Time</Form.Label>
                              <Form.Control
                                type="datetime-local"

                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                              />
                              <p className="_error">{formErrors.end_time}</p>




                            </>) : null
                          }

                        </>)
                      }
                    </Form.Group>
                  </div>
                ) : null
              }


              <Form.Group className="mb-3">
                <Form.Label>Royalty</Form.Label>
                <Form.Control
                  type="number"
                  name="royalty"
                  value={formData.royalty}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={
handleSubmit
                }>
                Create NFT
              </Button>
            </Form>
          </Col>
          <Col lg="2"></Col>
        </div>
      </Row>
    </Container>
  );

}
export default NftForm;

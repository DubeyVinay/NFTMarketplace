import React, { useLayoutEffect } from "react";

import { useState, useEffect, setState } from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import { createFlatSale } from "../ApiCalls/FixedPriceApi";
import { UserDetailsApi } from "../ApiCalls/UserDetailsApi";
import { Buffer } from "buffer";
import Wallet from "../../pages/Wallet";
import '../NftForm/NftForm.css'
import Switch from 'react-switch'
import ABI from '../ABI.json'
import { create } from 'ipfs-http-client';
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Sign } from "../utils/utils"

const client = create('https://ipfs.infura.io:5001/api/v0');

const NftForm = () => {

  let web3 = new Web3(window.ethereum);

  const { account, library } = useWeb3React();
  const [buffer, setBuffer] = useState(null);
  const isActive = localStorage.getItem("isActive");
  const newContract = '0xE96282a67a7155a246cee36E146dA7Da1D3cdD5C'
  const [isSale, setIsSale] = useState(false)
  const [formData, setFormData] = useState({
    nft__name: "",
    nft__Description: "",
    sale_amount: "",
    seller_address: "",
    royalty: "",
    Imguri: "",
    uri: "",
    tokenId: "",
    signature: "  "

  });

  
  const _tokenId = 0;




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      return console.log("Please connect your wallet first.");
      alert("Please connect your wallet first.")

    }
    else {

      const _json = new File([JSON.stringify(formData)], 'metadata.json');
      console.log("JSON File", _json);

      const json_add = await client.add(_json);
      const json_cid = json_add.path;
      formData.uri = json_cid;
      formData.seller_address = account;
      console.log("Json file cid", json_cid);
      console.log("Form Data", formData);

      console.log("Accounts", account);

      if (isSale) {

        // const _signature = await msgSignature(account);
        // await  msgSignature(formData.uri,account);
        //   console.log(window.ethereum);

        //   formData.signature = signature;
        await createFlatSale(formData);
        // console.log(account);
        const _accounts = account;
        const _tokenUri = formData.uri;
        const _amount = formData.sale_amount;
        const Signature = await Sign(_accounts,_tokenUri,_amount);
        console.log("aaaaaaa",Signature);
        

      }
      else {
        UserDetailsApi(formData);
      }

    }
  };



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const getFile = async (e) => {
    const file = e.target.files[0]
    const added = await client.add(file)
    const cid = `https://ipfs.infura.io/ipfs/${added.path}`
    formData.Imguri = cid;
    console.log("image cid", formData.Imguri);
  }

  const getCidMetaData = async (e, metadata) => {
    const added = await client.add()
    const cid = `https://ipfs.infura.io/ipfs/${added.path}`
    formData.uri = cid;
    console.log("form cid", formData.uri);
  }

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
                  name="nft_image"
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="nft__Description"
                  value={formData.nft__Description}
                  onChange={handleChange}
                />
              </Form.Group>
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

                      <select name="saleType" id="saleType">

                        <option value="fix">Fix Sale</option>



                      </select>
                      <br />
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="sale_amount"
                        value={formData.sale_amount}
                        onChange={handleChange}
                      />
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
              <Button variant="primary" type="submit" onClick={handleSubmit}>
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

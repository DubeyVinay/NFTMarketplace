import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import "../pages/Market.css"
import { getMarketplaceNFT } from "../components/ApiCalls/MarketplaceApi"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const Market = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {

    getData();
  }, []);

  const getData = async () => {
    const data = await getMarketplaceNFT();
    const res = data.data;
    setFormData(res);
    console.log(res,"resssss")
  }


  const getDataAuction = async () => {
    const data = await getMarketplaceNFT('auction');
    const res = data.data;
    
    setFormData(res);
    console.log(res,"resssss")
  }

  const getDataFlateSale = async () => {
    const data = await getMarketplaceNFT('fix');
    const res = data.data;
    setFormData(res);
    console.log(res,"resssss")
  }

  // const allNfts = async (e) => {
  //  nfts =
  // }


  return (
    <>
      <div className="market">
        <Container>
          <h2>Marketplace</h2>
         
          <div className="filterBtn">
          <div>
          <Button value="allNfts" className='active' onClick={ getData}>All</Button>
            <Button value="fixed" onClick={getDataFlateSale}>Fixed</Button>
            <Button value="auction" onClick={getDataAuction}>Auction</Button>
            </div>  
           
    
          </div>
         
          
          <div className="allNFTs">
            <Row>
              
                {
                  formData.map((item) => (
                    <>
                    <Col>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img src={item?.Imguri} />
                        <Card.Body>
                          <Card.Title>{item?.sale_amount}</Card.Title>
                        </Card.Body>
                      </Card>
                      </Col>
                    </>
                  ))
                }
              
            </Row>
          </div>

        </Container>
      </div>
    </>
  )
}

export default Market; 
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import "./userProfile.css"
import { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import 'react-tabs/style/react-tabs.css';
import { getFlateSale } from '../components/ApiCalls/FixedPriceApi'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { InjectedConnector } from '@web3-react/injected-connector'
import { getMarketplaceNFT } from "../components/ApiCalls/MarketplaceApi"
const UserProfile = () => {

    const { account,activate } = useWeb3React();
    const [formData, setFormData] = useState([]);
    // const { activate, deactivate, account, library, chainId, active } = useWeb3React();

    const Injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42,56, 137],
       
        
      });
    const connect = () =>{


        if (typeof window.ethereum == 'undefined') {
      console.log('MetaMask is not installed!');
      alert('MetaMask is not installed!')
      }
      else{
        
        activate(Injected);
        
        setProvider("Injected");
      
        localStorage.setItem('isWalletConnected',true)
        // this.setState({
        //   isActive:true
        // })
       
      }
      }

      const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
      };

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
          if (localStorage?.getItem('isWalletConnected') === 'true') {
            try {
              await connect();
              localStorage.setItem('isWalletConnected', true)
            } catch (ex) {
              console.log(ex)
            }
          }
        }
        connectWalletOnPageLoad()

        getData()
      }, []);


    const getData = async () => {

        const data = await getMarketplaceNFT();

        const res = data.data;
        console.log("qqqqq", res[0].seller_address);
        setFormData(res);
    }

    console.log("wwwwww", formData);


    return (
        <Container>

            <div className='user_profile'>
                <div className="user_img">



                </div>
                <p>{account}</p>

                <Tabs>
                    <TabList>
                        <Tab>Collected</Tab>
                        <Tab>Created</Tab>
                        <Tab>Collections</Tab>



                    </TabList>

                    <TabPanel>
                                                <h2>Any content 1</h2>
                                            </TabPanel>
                                            <TabPanel>
                                            <div classNameName="created">

<Row>

    {
        formData.map((item) => (
            <>
                {account == item.seller_address ? (


                    <>

                       
                        
                        <Col>
                            <Card style={{ width: '18rem' }}>

                                {item?.Imguri === "" ? <Card.Img variant="top" src={"https://storage.googleapis.com/opensea-static/opensea-profile/32.png"} alt="NFT" />
                                    : <Card.Img variant="top" src={item?.Imguri} alt="NFT" />}
                                <Card.Body>
                                    <Card.Title>{item?.nft__name}</Card.Title>
                                    <Card.Text>
                                     <p>{item?.nft__Description}</p>
                                     <p>{item?.sale_type}</p>   

                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>


                    </>

                ) : null
                }
            </>
        ))
    }
</Row>


</div>
                                            </TabPanel>
                                            <TabPanel>
                                                <h2>Any content 3</h2>
                                            </TabPanel>

                </Tabs>
                
                
            </div>


        </Container>
    )
}

export default UserProfile;

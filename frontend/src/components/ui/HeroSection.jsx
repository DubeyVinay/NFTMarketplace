import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import './hero-section.css'
import ReactSearchBox from "react-search-box";

import MarketPlace from "../MarketPlace/MarketPlace";



const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          

          <Col lg="12" md="12">
            <div className="her__content">
            
              <h2 className="align-text-center"><span className="hero_heding">Community</span>-centric <br/>
NFT marketplace</h2>
            </div>
          </Col>

          <Col lg="12" md="12">
          <div className="input_search">
          
          <input type="search" placeholder="search" />
         

          </div>
          
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <MarketPlace/>
        </Row>
      </Container>
    </section>

  );
};

export default HeroSection;

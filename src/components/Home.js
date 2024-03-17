import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppBar from './AppBar'
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { Card } from 'react-bootstrap';

const Home = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setActiveIndex(selectedIndex);
    };

  return (
    <Container style={{ minWidth: '500px' }} fluid className='primary m-0 p-0 vh-100 vw-120 position-relative'>
        <Image src="images/vector.svg" className='d-none d-md-block img-fluid justify-content-end  vh-100 position-absolute top-0 end-0 z-0' fluid/>
        <AppBar className="position-absolute top-0 z-1 "/>
        <Row className="main-grid justify-content-md-center">
            <Col  className='main-box'>
                <Col>
                <div className="text-light main-text p-1">Are you in NEED?</div>
                <div className="text-light sub-text p-1">Don’t Wait!</div>
                <div  className="quote p-1">Revamp. Restock. Recharge.</div>
                <button className='home-button '><span className='btn-text'>Check Here!</span> </button>
                </Col>
                <Col>       
                </Col>
                
            </Col>
            <Col className='d-none  d-md-block home-img'>
                <Image className='home-img' src='/images/restaurant.jpeg' />

            </Col>
        </Row>
        
    </Container>
  )
}

export default Home

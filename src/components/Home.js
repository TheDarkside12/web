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
                <Row className="justify-content-start">
    <Col xs={12} sm={10} md={8} lg={6} className='p-2'>
        <Carousel className=' h-100' interval={null} fade activeIndex={activeIndex} onSelect={handleSelect} indicators={false}>
            <Carousel.Item className='h-50'>
                <Col className='d-flex justify-content-center align-items-center h-100'>
                    <Card className='c-body'>
                        <Card.Body className='c-body'>
                            <div className=" d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                                <img className='' src='images/breakfast.png' alt='Breakfast' />
                                <div className=''>
                                    <Card.Title>Breakfast</Card.Title>
                                    <Card.Text>special items added..</Card.Text>
                                    <Card.Text>available only on 10-03-2024</Card.Text>
                                </div>
                            </div>
                            <div className=" d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                                <img className="" src='images/breakfast.png' alt='Breakfast' />
                                <div className=''>
                                    <Card.Title>Buy One, Get One Free!</Card.Title>
                                    <Card.Text>Purchase any ruler and get another one free. Limited time offer.</Card.Text>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Carousel.Item>
        </Carousel>
    </Col>
</Row>        
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

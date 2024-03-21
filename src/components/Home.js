import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppBar from './AppBar'
import Image from 'react-bootstrap/Image';

const Home = () => {

    

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
                <Image className='' src='/images/sketchbook.jpg' />

            </Col>
        </Row>
        
    </Container>
  )
}

export default Home

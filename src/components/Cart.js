import React, { useState, useEffect } from "react";

import QRCode from "react-qr-code";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'; // Import necessary Firestore functions
import firebaseApp from './FirebaseConfig';
// import BillComponent from "./bill";
import CartItem from "./cart_item";
import AppBar from "./AppBar";
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import SuccessPopup from './SuccessPopup';

export default function Basic() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const categories = ["stationary", "artSupplies", "treats",'tiffinItems', 'fastFoods', 'bakeryItems','naturals'];
        const allItems = [];

        for (const category of categories) {
          const querySnapshot = await getDocs(collection(db, category));
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            collectionName: category, // Add collectionName property
            ...doc.data(),
          }));
          allItems.push(...items);
        }

        setCartItems(allItems);
        calculateTotalPrice(allItems); // Just call calculateTotalPrice, setTotalPrice is accessible in the component's scope
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array to only run once when the component mounts

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQRCode(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;

    
    if (Array.isArray(items)) {
      
      items.forEach((item) => {
        
        if (typeof item.quantity === 'number' && typeof item.price === 'number') {
          total += item.quantity * item.price;
        } else {
          console.error('Invalid quantity or price:', item);
        }
      });
    } else {
      console.error('Items is not a valid array:', items);
    }

    
    setTotalPrice(total);
  };

  const deleteCartItem = async (itemId) => {
    try {
      
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      
      calculateTotalPrice(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const setItems = async (itemId, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + quantityChange } : item
      )
    );
    // Recalculate total price after changing item quantity
    calculateTotalPrice(cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + quantityChange } : item
    ));
  };
  const updateTotalPrice =  () => {
    calculateTotalPrice(cartItems);
    calculateTotalPrice(cartItems);
  };
  
  const [showPopup, setShowPopup] = useState(false); // State variable to manage popup visibility
    const [successMessage, setSuccessMessage] = useState(''); // State variable to manage success message

    const handleProceed = () => {
        // Show success message
        setSuccessMessage('Your transaction was successful!');

        // Open the popup
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        // Close the popup
        setShowPopup(false);
    };

  return (
    <Container style={{ minWidth: '500px' }} fluid className='primary m-0 p-0 vh-200 vw-100 position-relative'>
      <AppBar/>
      <div style={{position:'absolute',top:'50%',right:'50%'}}>
            
            <SuccessPopup show={showPopup} message={successMessage} onClose={handleClosePopup} />

        </div>
      <Container className="vw-80 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col  className="">
            <Card className="bg-transparent">
              <CardBody className="">
                <Row >
                  <h2 className="text-light">Shopping Cart</h2>
                  <Col className="my-5">
                    <Container>
                      {cartItems.map((item) => (
                        item.quantity > 0 && (
                          <Row key={item.id}>
                            <Col className="mb-3" >
                              <CartItem className="mb-3"
                                id={item.id}
                                initialQuantity={item.quantity}
                                onDelete={deleteCartItem}
                                updateTotalPrice={updateTotalPrice}
                                setItems={setItems}
                                collectionName={item.collectionName} // Pass collectionName
                              />
                            </Col>
                          </Row>
                        )
                      ))}
                    </Container>
                  </Col>
                  <Col >
                    <Container style={{maxWidth:'500px'}}>
                      <Card style={{ background: "linear-gradient(to right , #FFF500,#FFDF39)" }}>
                        <CardBody>
                          <div className="d-flex justify-content-center align-items-center mb-4">
                            <div tag="h1 fw-bold" className="">
                              AMOUNT
                            </div>
                            <p></p>
                          </div>
                          <p className="small d-flex justify-content-center">Scan to pay</p>
                          <div className="d-flex justify-content-center align-items-center">
                          {showQRCode && (
                            <QRCode className="justify-self-center align-items-center"
                              title="SECE PAYMENT"
                              value={`upi://pay?pa=sivanithishkumar12@oksbi&pn=Siva D. Nithish&am=${totalPrice}.00&cu=INR&aid=uGICAgIC36tTscg.00`}
                              style={{ padding: "5px" }}
                            />
                          )}
                          </div>
                          
                          <hr />
                          <div className="d-flex justify-content-center align-items-center " style={{flexDirection:'column'}}>
                          <div className="d-flex justify-content-center">
                            <p className="mb-2 h3">Total &nbsp;</p>
                            <p className="mb-2 h3">INR {totalPrice}/-</p>
                          </div>
                          <button
                            color="info"
                            variant="warning"
                            block
                            size="lg"
                            className="btn justify-content-center btn-primary"
                            onClick={handleProceed}
                          >
                            PROCEED !
                          </button>
                          {/* <BillComponent className="justify-content-center" cartItems={cartItems} totalPrice={totalPrice} /> */}
                          </div>
                        </CardBody>
                      </Card>
                    </Container>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

import React, { useState, useEffect } from "react";

import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'; // Import necessary Firestore functions
import firebaseApp from './FirebaseConfig';
import BillComponent from "./bill";
import CartItem from "./cart_item";
import AppBar from "./AppBar";
import { Container, Row, Col, Card, Button, CardBody } from 'react-bootstrap';
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

    // Check if items is defined and is an array
    if (Array.isArray(items)) {
      // Iterate over each item and accumulate the total price
      items.forEach((item) => {
        // Check if quantity and price are valid numbers
        if (typeof item.quantity === 'number' && typeof item.price === 'number') {
          total += item.quantity * item.price;
        } else {
          console.error('Invalid quantity or price:', item);
        }
      });
    } else {
      console.error('Items is not a valid array:', items);
    }

    // Update the total price state
    setTotalPrice(total);
  };

  const deleteCartItem = async (itemId) => {
    try {
      // Remove item from UI
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      // Recalculate total price after removing item
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
                            <Col >
                              <CartItem
                                id={item.id}
                                initialQuantity={item.quantity}
                                onDelete={deleteCartItem}
                                updateTotalPrice={calculateTotalPrice}
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
                    <Container>
                      <Card style={{ background: "orange" }}>
                        <CardBody>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div tag="h5" className="mb-0">
                              Amount (Id)
                            </div>
                            <p></p>
                          </div>
                          <p className="small">Scan to pay</p>
                          {showQRCode && (
                            <QRCode
                              title="SECE PAYMENT"
                              value={`upi://pay?pa=jaiguru2992@okhdfcbank&pn=Jai%20guru&am=${totalPrice}.00&cu=INR&aid=uGICAgMDE16mMcg`}
                              style={{ padding: "5px" }}
                            />
                          )}
                          <hr />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total</p>
                            <p className="mb-2">INR {totalPrice}/-</p>
                          </div>
                          <button
                            color="info"
                            variant="warning"
                            block
                            size="lg"
                            className="btn btn-primary"
                            onClick={handleProceed}
                          >
                            PROCEED !
                          </button>
                          <BillComponent cartItems={cartItems} totalPrice={totalPrice} />
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

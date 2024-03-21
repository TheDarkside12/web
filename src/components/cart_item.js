import React, { useState } from 'react';
import { addProductToCart } from './addproducttocart'; 
import CartProduct from './cartProduct';
import { Container, Row, Col, Card, Button, CardBody } from 'react-bootstrap';

const CartItem = ({ id, initialQuantity, onDelete, updateTotalPrice, setItems, collectionName }) => {
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    setItemQuantity(prevQuantity => prevQuantity + 1); // Increment item quantity
    addProductToCart(id, 1, collectionName); // Update quantity in Firestore
    setItems(id, +1); // Update local state
    updateTotalPrice(); // Recalculate total price
  };
  
  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity(prevQuantity => prevQuantity - 1); 
      addProductToCart(id, -1, collectionName); 
      setItems(id, -1); 
      updateTotalPrice(); 
    }
  };

  const handleDelete = () => {
    if (itemQuantity > 0) {
      onDelete(id); 
      addProductToCart(id, -itemQuantity, collectionName); 
    }
  };

  return (
    <Container>
      <Card className='c-body h-100 justify-content-center align-items-center'>
        <CardBody>
          <Row className='c-body h-100 justify-content-center align-items-center'>
            <Col xs={7}>
            <CartProduct id={id} collectionName={collectionName} />
            </Col>
            <Col xs={3}>
              <Button onClick={handleDecrease}>-</Button>
              <span className="mx-2">{itemQuantity}</span>
              <Button onClick={handleIncrease}>+</Button>
            </Col>
            <Col xs={2}>
               <img
                 src={'https://cdn-icons-png.flaticon.com/128/1214/1214428.png'}
                 alt="Delete"
                 style={{ cursor: 'pointer', height: '32px', marginLeft: '20px' }}
                 onClick={handleDelete} // Call handleDelete function when clicked
               />
            </Col>
          </Row>
          
        </CardBody>
      </Card>
    </Container>
  );
};

export default CartItem;

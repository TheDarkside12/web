import React, { useState } from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
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
      setItemQuantity(prevQuantity => prevQuantity - 1); // Decrement item quantity
      addProductToCart(id, -1, collectionName); // Update quantity in Firestore
      setItems(id, -1); // Update local state
      updateTotalPrice(); // Recalculate total price
    }
  };

  const handleDelete = () => {
    if (itemQuantity > 0) {
      onDelete(id); // Call the delete function with the id of the item to be deleted
      addProductToCart(id, -itemQuantity, collectionName); // Subtract itemQuantity from the quantity of the product with this id in Firestore
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
              <Button>-</Button>
              <span className="mx-2">{itemQuantity}</span>
              <Button>+</Button>
            </Col>
            <Col xs={2}>
               <img
                 src={'https://cdn-icons-png.flaticon.com/512/6861/6861362.png'}
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

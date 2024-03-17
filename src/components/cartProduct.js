import React, { useEffect, useState } from 'react';
import { db } from './FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CartProduct = ({ id, collectionName }) => {
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id.trim() === '') {
        // Exit early if the id is empty or undefined
        return;
      }

      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProduct();
  }, [id, collectionName]);

  return (
    <Container>
      <Row className='h-75 d-flex align-items-center'>
      <Col className=' d-flex align-items-center' xs={4}>
        <Card.Img fluid className='' src={product?.imagePath} />
      </Col>
      <Col xs={8}>
      <Card.Body className='c-body '>
          <Card.Title className='fs-5'>{product?.itemName}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>₹ {product?.price}</Card.Text>
      </Card.Body>
      </Col>
      </Row>
    </Container>
  );
};

export default CartProduct;

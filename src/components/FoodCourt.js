import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from './FirebaseConfig';
import AppBar from './AppBar';

const FoodCourt = () => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const categories = ['tiffinItems', 'fastFoods', 'bakeryItems'];
      const fetchedItems = {};

      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const categoryItems = [];
        querySnapshot.forEach((doc) => {
          categoryItems.push({ id: doc.id, ...doc.data(), quantity: 0 }); // Add quantity property
        });
        fetchedItems[category] = categoryItems;
      }

      setItems(fetchedItems);
    };

    fetchData();
  }, []);

  const handleIncrement = async (id, category) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, category, id);
    await updateDoc(docRef, { quantity: 1 }); // Increment quantity by 1
  };

  return (
    <Container style={{ minWidth: '500px' }} fluid className='primary m-0 p-0 vh-200 vw-100 position-relative'>
      <AppBar />
      <Container>
        {Object.keys(items).map((category) => (
          <div key={category}>
            <h2 className='text-light text-capitalize'>{category}</h2>
            <Row xs={1} md={3} className="pb-3 g-4 equal-height">
              {items[category].map((item) => (
                <Col key={item.id}>
                  <Card className='c-body h-100 justify-content-center align-items-center'>
                    <Row xs={2} className="g-0 justify-content-center align-items-center">
                      <Col className='' xs={8}>
                        <Card.Body className='c-body'>
                          <Card.Title>{item.itemName}</Card.Title>
                          <Card.Text>{item.description}</Card.Text>
                          <Card.Text>₹ {item.price}</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col className='card-image' xs={4}>
                        <Card.Img fluid src={item.imagePath} />
                      </Col>
                      <button
                        onClick={() => handleIncrement(item.id, category)}
                        style={{
                          position: 'absolute',
                          bottom: '5%',
                          right: '15%',
                          padding: '5px 10px',
                          borderRadius: '10px 0px 10px 0px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          color: 'black',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '30px',
                          fontWeight: 'bolder'
                        }}>+</button>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </Container>
  );
};

export default FoodCourt;

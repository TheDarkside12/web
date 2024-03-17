import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import firebaseApp from './FirebaseConfig';
import AppBar from './AppBar';

const Saloon = () => {
    const [items, setItems] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(firebaseApp);
            const categories = ['naturals'];
            const fetchedItems = {};

            for (const category of categories) {
                const querySnapshot = await getDocs(collection(db, category));
                const categoryItems = [];
                querySnapshot.forEach((doc) => {
                    categoryItems.push({ id: doc.id, ...doc.data() });
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
      await updateDoc(docRef, { quantity: 1 }); 
    };

    return (
        <Container style={{ minWidth: '500px' }} fluid className='primary m-0 p-0 vh-100 vw-100 position-relative'>
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
                                                    <Card.Title >{item.serviceName}</Card.Title>
                                                    <Card.Text>{item.description}</Card.Text>
                                                    <Card.Text>₹ {item.price}</Card.Text>
                                                </Card.Body>
                                            </Col>
                                            <Col className='card-image' xs={4}>
                                                <Card.Img fluid className='' src={item.imagePath} />
                                            </Col>
                                            <button
                                            onClick={() => handleIncrement(item.id, category)}
                                            style={{
                                              position: 'absolute',
                                              bottom: '5%',
                                              right: '15%',
                                              padding: '5px 10px',
                                              borderRadius: '10px 0px 10px 0px',
                                              color: 'black',
                                              border: 'none',
                                              cursor: 'pointer',
                                              fontSize: '30px',
                                              fontWeight: 'bolder',
                                              background:'transparent'
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
    )
}

export default Saloon;

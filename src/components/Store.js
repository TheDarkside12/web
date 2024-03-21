import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import firebaseApp from './FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import AppBar from './AppBar';
import SuccessPopup from './SuccessPopup';

const Store = () => {
  const [items, setItems] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const categories = ['stationary', 'artSupplies', 'treats'];
      const fetchedItems = {};

      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const categoryItems = [];
        querySnapshot.forEach((doc) => {
          categoryItems.push({ id: doc.id, ...doc.data(), quantity: 0 });
        });
        fetchedItems[category] = categoryItems;
      }

      setItems(fetchedItems);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrement = async (id, collectionName) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { quantity: 1 });
  };
  const [showPopup, setShowPopup] = useState(false); // State variable to manage popup visibility
    const [successMessage, setSuccessMessage] = useState(''); // State variable to manage success message

    const handleProceed = () => {
        // Show success message
        setSuccessMessage('Item added Successfully!');

        // Open the popup
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        // Close the popup
        setShowPopup(false);
    };

  return (
    <Container style={{ minWidth: '500px' }} fluid className='primary m-0 p-0 vh-200 vw-100 position-relative'>
      <AppBar />
      <SuccessPopup show={showPopup} message={successMessage} onClose={handleClosePopup} />

      <Container>
        {Object.keys(items).map((category) => (
          <div key={category}>
            <h2 className='text-light text-capitalize'>{category}</h2>
            <Row xs={1} md={3} className="pb-3 g-4 equal-height">
              {items[category] && items[category].map((item) => (
                <Col key={item.id}>
                  <Card className='c-body h-100 justify-content-center align-items-center'>
                    <Row xs={2} className="g-0 justify-content-center align-items-center">
                      <Col className='' xs={8}>
                        <Card.Body className='c-body'>
                          <Card.Title>{item.itemName}</Card.Title>
                          <Card.Text>{item.description}</Card.Text>
                          <Card.Text>INR {item.price}</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col className='card-image' xs={4}>
                        <Card.Img fluid src={item.imagePath} />
                      </Col>
                      
                    </Row>
                    <button
                        onClick={() => {
                          handleIncrement(item.id, category);
                          handleProceed();
                      }}
                        style={{
                          position: 'absolute',
                          bottom: '0%',
                          right: '0%',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          color: 'black',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '30px',
                          fontWeight: 'bolder'
                        }}>+</button>
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

export default Store;

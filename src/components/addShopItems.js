const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('C:/Users/Darkside-PC/Desktop/Code-Practice/Javascript/Webathon/client/fhub/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a Firestore reference
const db = admin.firestore();

// Define the data to add to Firestore
const shopItems = {
  "naturals": [
    {
      "serviceName": "Haircut",
      "description": "Choose your style and get a fresh haircut.",
      "price": 200,
      "imagePath": "images/haircut.jpg"
    },
    {
      "serviceName": "Facials and Skincare",
      "description": "Revitalize your skin with our natural facial treatments.",
      "price": 1500,
      "imagePath": "images/facials_skincare.jpg"
    },
    {
      "serviceName": "Manicure and Pedicure",
      "description": "Pamper your hands and feet with our natural manicure and pedicure services.",
      "price": 1000,
      "imagePath": "images/manicure_pedicure.jpg"
    },
    {
      "serviceName": "Hair Coloring",
      "description": "Enhance your hair color with our natural coloring techniques.",
      "price": 2000,
      "imagePath": "images/hair_coloring.jpg"
    },
    {
      "serviceName": "Spa Treatments",
      "description": "Relax and rejuvenate with our natural spa treatments.",
      "price": 2000,
      "imagePath": "images/spa_treatments.jpg"
    },
    {
      "serviceName": "Party Makeup",
      "description": "Look stunning with our natural party makeup services.",
      "price": 1000,
      "imagePath": "images/party_makeup.jpg"
    }
  ]
};

// Add shopItems data to Firestore
const addShopItemsToFirestore = async () => {
  try {
    // Add each category to Firestore as a collection
    for (const category in shopItems) {
      const items = shopItems[category];
      for (const item of items) {
        await db.collection(category).add(item);
      }
    }
    console.log('Shop items added to Firestore successfully!');
  } catch (error) {
    console.error('Error adding shop items to Firestore:', error);
  }
};

// Call the function to add shopItems to Firestore
addShopItemsToFirestore();

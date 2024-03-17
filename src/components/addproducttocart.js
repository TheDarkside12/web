import { db } from './FirebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const addProductToCart = async (productId, quantity, collectionName) => {
  try {
    // Reference to the document in the specified collection
    const docRef = doc(db, collectionName, productId);

    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, update the quantity
      await updateDoc(docRef, {
        quantity: docSnap.data().quantity + quantity
      });
    } else {
      // If the document doesn't exist, create a new document with the quantity
      await setDoc(docRef, { quantity });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

export { addProductToCart };

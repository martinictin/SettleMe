import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utillities/firebase";
import { Alert } from "react-native";

export async function getProductByName(productName) {
  try {
    const q = query(
      collection(db, "product"),
      where("name", "==", productName)
    );
    const querySnapshot = await getDoc(q);

    return querySnapshot.data();
  } catch (error) {
    Alert.alert(error.message);
  }
}

export const getProductsInCity = async (city) => {
  let productsList = [];
  try {
    const q = await query(collection(db, "product"), where("city", "==", city));
    const docsSnap = await getDocs(q);
    docsSnap.forEach((doc) => {
      productsList.push(doc.data());
    });
  } catch (error) {
    console.log(error.toString());
    Alert.alert(error.message);
  }
  if (productsList.length > 0) {
    return productsList;
  } else {
    Alert.alert("No products in that area");
  }
};

export const setProductAverageRating = async (product_name) => {
  let ratingList = [];
  try {
    const q = await query(
      collection(db, "review"),
      where("product_name", "==", product_name)
    );
    const docsSnap = await getDocs(q);
    docsSnap.forEach((doc) => {
      const rating = doc.data().rating;
      if (!isNaN(rating)) {
        ratingList.push(rating);
      }
    });
  } catch (error) {
    Alert.alert(error.message);
  }

  const sum = ratingList.reduce((acc, rating) => acc + rating, 0);
  let averageRating = sum / ratingList.length;
  averageRating = isNaN(averageRating) ? 0 : parseFloat(averageRating);

  try {
    const q = query(
      collection(db, "product"),
      where("name", "==", product_name)
    );
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];

    if (docSnap) {
      await updateDoc(doc(db, "product", docSnap.id), {
        rate: averageRating,
      });
      console.log("Successfully updated product average rating");
    }
  } catch (error) {
    console.error(error);
  }
};

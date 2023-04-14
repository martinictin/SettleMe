import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../utillities/firebase";
import { Alert } from "react-native";

export const getReviewsByProduct = async (product) => {
  let reviewsList = [];
  try {
    const q = await query(
      collection(db, "review"),
      where("product_name", "==", product.name)
    );
    const docsSnap = await getDocs(q);
    docsSnap.forEach((doc) => {
      reviewsList.push(doc.data());
    });
  } catch (error) {
    Alert.alert(error.message);
  }
  return reviewsList;
};

export const setStars = async (number, product_name) => {
  const q = query(
    collection(db, "review"),
    where("product_name", "==", product_name),
    where("rated_by", "==", auth.currentUser.email)
  );
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const docSnap = querySnapshot.docs[0];
      await setDoc(doc(db, "review", docSnap.id), {
        rated_by: auth.currentUser.email,
        rating: number,
        product_name: product_name,
      });
    } else {
      await addDoc(collection(db, "review"), {
        rated_by: auth.currentUser.email,
        rating: number,
        product_name: product_name,
      });
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

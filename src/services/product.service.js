import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utillities/firebase";

export async function getAllProducts() {
  try {
    await onSnapshot(query(collection(db, "product")), (querySnapshot) => {
      let productList = [];
      querySnapshot.forEach((doc) => {
        productList.push({ ...doc.data(), id: doc.id });
      });
      return productList;
    });
  } catch (error) {
    console.log("Error getting field from documents", error);
    throw error;
  }
}

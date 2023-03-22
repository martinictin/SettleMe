import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
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
    console.log(error.toString());
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

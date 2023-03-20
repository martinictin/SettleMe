import { collection, query, where, getDoc } from "firebase/firestore";
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

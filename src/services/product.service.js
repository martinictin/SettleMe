import { collection, query, where, getDoc } from "firebase/firestore";
import { db } from "../utillities/firebase";

export async function getProductByName(productName) {
  console.log("usa u funkciju");
  const q = query(collection(db, "product"), where("name", "==", productName));
  console.log("prije querysnapshota");
  const querySnapshot = await getDoc(q.get());
  console.log("prije returna ");
  console.log(querySnapshot, querySnapshot.data());
  return { ...querySnapshot.data(), id: querySnapshot.id };
}

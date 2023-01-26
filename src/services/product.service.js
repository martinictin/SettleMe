import { collection, query, onSnapshot, where } from "firebase/firestore";
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

export async function getProductsByCity(city) {
  try {
    await onSnapshot(
      query(
        collection(db, "product"),
        where(
          "city",
          "==",
          city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
        )
      ),
      (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        console.log(results);
        return results;
      }
    );
  } catch (error) {
    console.log("Error getting field from documents", error);
    throw error;
  }
}

export async function getProductsByName(name) {
  try {
    await onSnapshot(
      query(
        collection(db, "product"),
        where("name", "==", name.charAt(0).toUpperCase() + name.slice(1))
      ),
      (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        console.log(results);
        return results;
      }
    );
  } catch (error) {
    console.log("Error getting field from documents", error);
    throw error;
  }
}

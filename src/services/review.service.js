import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utillities/firebase";
import { Alert } from "react-native";

export const getReviewsByProduct = async (product) => {
  let reviewsList = [];
  try {
    const q = await query(
      collection(db, "review"),
      where("product_id", "==", product.id)
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

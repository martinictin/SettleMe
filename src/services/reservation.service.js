import {
  doc,
  Timestamp,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../utillities/firebase";
import { Alert } from "react-native";

export const setReservationByUser = async (date, product) => {
  try {
    await setDoc(doc(db, "reservation", auth.currentUser.uid), {
      reserved_by: auth.currentUser.email,
      reserved_at: Timestamp.now(),
      reservation_time: Timestamp.fromDate(new Date(date)),
      status: "Pending",
      product_name: product.name,
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const getReservationsByUser = async () => {
  let reservationsList = [];
  try {
    const q = await query(
      collection(db, "reservation"),
      where("reserved_by", "==", auth.currentUser.email)
    );
    const docsSnap = await getDocs(q);
    if (docsSnap) {
      try {
        docsSnap.forEach((doc) => {
          reservationsList = [doc.data()].concat(reservationsList);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No docsnap!");
    }
    return reservationsList;
  } catch (error) {
    console.log(error);
  }
};

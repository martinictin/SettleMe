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

const user = auth.currentUser;

export const setReservationByUser = async (date, product) => {
  try {
    await setDoc(doc(db, "reservation", user.uid), {
      reserved_by: user.email,
      reserved_at: Timestamp.now(),
      reservation_time: Timestamp.fromDate(new Date(date)),
      status: "Pending",
      product: product.name,
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const getReservationsByUser = async () => {
  let reservationsList = [];
  const email = user.email;
  console.log(email);
  try {
    const q = await query(
      collection(db, "reservation"),
      where("reserved_by", "==", email)
    );
    const docsSnap = await getDocs(q);
    docsSnap.forEach((doc) => {
      reservationsList.push(doc.data());
    });
  } catch (error) {
    Alert.alert(error.message);
  }
  return reservationsList;
};

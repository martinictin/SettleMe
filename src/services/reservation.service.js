import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../utillities/firebase";
import { firebase } from "@react-native-firebase/firestore";

export const getReservationsByUser = async (userId) => {
  try {
    await onSnapshot(
      query(collection(db, "reservation").where("userId", "==", userId)),
      (querySnapshot) => {
        let reservationList = [];
        querySnapshot.forEach((doc) => {
          reservationList.push({ ...doc.data(), id: doc.id });
        });
        console.log(reservationList.toDate().toLocaleString());
        return reservationList;
      }
    );
  } catch (e) {
    e.message();
  }
};

export const setReservationByUser = async (year, month, date, hour, minute) => {
  const userID = auth.currentUser.uid;

  await setDoc(
    doc(db, "reservation").add({
      userId: userID,
      reserved_at: firebase.firestore.Timestamp.now(),
      reservation_time: Timestamp.fromDate(
        new Date(year, month, date, hour, minute, 0)
      ),
    })
  );
};

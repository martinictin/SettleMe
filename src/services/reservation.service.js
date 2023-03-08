import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  setDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../utillities/firebase";

export const getReservationsByUser = async () => {
  const reservations = [];
  const q = query(
    collection(db, "reservation"),
    where("reserved_by", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    reservations.push({ ...doc.data(), id: doc.id });
  });
  return reservations;
};
export function setReservationByUser(year, month, date, hour, minute) {
  const userID = auth.currentUser.uid;

  setDoc(
    doc(db, "reservation").add({
      userId: userID,
      reserved_at: Timestamp.now(),
      reservation_time: Timestamp.fromDate(
        new Date(year, month, date, hour, minute, 0)
      ),
    })
  );
}

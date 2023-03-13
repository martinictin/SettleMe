import {
  collection,
  query,
  where,
  Timestamp,
  getDocs,
  addDoc,
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

export const setReservationByUser = async (date, product) => {
  const userEmail = auth.currentUser.email;

  await addDoc(collection(db, "reservation"), {
    reserved_by: userEmail,
    reserved_at: Timestamp.now(),
    reservation_time: Timestamp.fromDate(new Date(date)),
    status: "Pending",
    product: product.name,
  });
};

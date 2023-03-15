import { collection, Timestamp, addDoc } from "firebase/firestore";
import { db, auth } from "../utillities/firebase";

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

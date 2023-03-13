import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, update } from "firebase/firestore";
import { auth, db } from "../utillities/firebase";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const changeAccountInfo = async (
  name,
  lastName,
  phoneNumber,
  password
) => {
  const user = auth().currentUser;
  try {
    const userRef = collection(db, "user").doc(user.uid);
    await userRef.update({
      name,
      lastName,
      phoneNumber,
      // only update password if a new password was entered
      ...(password ? { password } : {}),
    });
    alert("Changes saved successfully!");
  } catch (error) {
    console.error(error);
    alert("An error occurred while saving changes.");
  }
};

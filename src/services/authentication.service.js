import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  getDocs,
  where,
  doc,
} from "firebase/firestore";
import { auth, db } from "../utillities/firebase";
import { Alert } from "react-native";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const changeAccountInfo = async (
  name,
  lastname,
  phoneNumber,
  password,
  repeatedPassword
) => {
  if (repeatedPassword === password) {
    const q = query(
      collection(db, "user"),
      where("email", "==", auth.currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    const user = doc(db, "user", docID);
    if (password) {
      try {
        await updateDoc(user, {
          name: name,
          last_name: lastname,
          phone_number: phoneNumber,
          password: password,
        });
        Alert.alert("User info updated!");
      } catch (e) {
        Alert.alert("There has been trouble processing the request!");
      }
    }
    if (password) {
      try {
        await updateDoc(user, {
          name: name,
          last_name: lastname,
          phone_number: phoneNumber,
        });
        Alert.alert("User info updated!");
      } catch (e) {
        Alert.alert("There has been trouble processing the request!");
      }
    }
  } else {
    Alert.alert("Password doesn't match");
  }
};

export const setUserInfo = async (email, password) => {
  await addDoc(collection(db, "user"), {
    email: email,
    password: password,
    phone_number: null,
    name: null,
    last_name: null,
  });
};

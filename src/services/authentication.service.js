import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, updatePassword } from "../utillities/firebase";
import { Alert } from "react-native";

const user = auth.currentUser;

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const setUserInfo = async (email) => {
  await setDoc(doc(db, "user", user.uid), {
    email: email,
    phone_number: null,
    name: null,
    last_name: null,
    created_at: Timestamp.now(),
  });
};

export const getUserInfo = async () => {
  const docRef = doc(db, "user", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const updateUserInfo = async (
  name,
  lastname,
  phonenumber,
  password,
  repeatedpassword
) => {
  await updateDoc(doc(db, "user", user), {
    name: name,
    last_name: lastname,
    phone_number: phonenumber,
  });

  if (password === repeatedpassword) {
    updatePassword(user, password)
      .then(() => {
        Alert.alert("Password changed!");
      })
      .catch((error) => {
        Alert.alert(error);
      });
  } else {
    Alert.alert("Password doesn't match");
  }
};

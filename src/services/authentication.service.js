import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../utillities/firebase";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { Alert } from "react-native";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const setUserInfo = async (email) => {
  await setDoc(doc(db, "user", auth.currentUser.uid), {
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
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const updateUserInfo = async (name, lastname, phonenumber) => {
  try {
    await updateDoc(doc(db, "user", auth.currentUser.uid), {
      name: name,
      last_name: lastname,
      phone_number: phonenumber,
    });
    Alert.alert("User info changed successfully!");
  } catch (e) {
    Alert.alert(e.message);
  }
};

export const changePassword = (
  currentPassword,
  newPassword,
  repeatedPassword
) => {
  if (newPassword) {
    if (newPassword === repeatedPassword) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          updatePassword(auth.currentUser, newPassword)
            .then(() => {
              Alert.alert("Password changed!");
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
        .catch((error) => {
          Alert.alert("Wrong current password!", error);
        });
    } else {
      Alert.alert("Password doesn't match");
    }
  } else {
    Alert.alert("Please enter password!");
  }
};

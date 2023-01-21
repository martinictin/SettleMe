import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utillities/firebase";

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

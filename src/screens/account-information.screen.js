import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { SafeArea } from "../utillities/utills/safe-area.component";
import { auth, db } from "../utillities/firebase";
import { collection, getDoc } from "firebase/firestore";

export const AccountInformationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Fetch the user's information from Firestore and update state
  //   const userId = auth.currentUser.uid;
  //   const userRef = collection(db, "user").getDoc(userId);

  //   userRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const data = doc.data();
  //         setFirstName(data.firstName);
  //         setLastName(data.lastName);
  //         setPhoneNumber(data.phoneNumber);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

  // const handleUpdate = () => {
  //   setIsLoading(true);

  //   const userId = auth.currentUser.uid;
  //   const userRef = collection(db, "user").getDoc(userId);

  //   // Update the user's information in Firestore
  //   userRef
  //     .update({
  //       first_name: firstName,
  //       last_name: lastName,
  //       phone_number: phoneNumber,
  //     })
  //     .then(() => {
  //       console.log("User information updated successfully!");
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating user information:", error);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <SafeArea>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {/* <Button
        title={isLoading ? "Updating..." : "Update"}
        onPress={handleUpdate}
        disabled={isLoading}
      /> */}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

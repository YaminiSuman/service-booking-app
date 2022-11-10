import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";

import { AuthContext } from "../store/AuthContext";
import BookingList from "../components/ui/BookingList";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";

function DefaultBookingInfo() {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate("Login", {
      redirectScreenName: "MyBookingList",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>Log in to see your bookings</Text>
        <View style={styles.buttons}>
          <Button onPress={navigateToLogin}>Take me to Login</Button>
        </View>
      </View>
    </View>
  );
}

function MyBookingList() {
  const authCtx = useContext(AuthContext);
  return !authCtx.isAuthenticated ? <DefaultBookingInfo /> : <BookingList />;
}

export default MyBookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent:"center"
  },
  inputContainer: {
    padding: 55,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    alignSelf: "center",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    marginTop: 15,
  },
});
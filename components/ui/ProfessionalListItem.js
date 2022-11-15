import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useContext } from "react";
import Toast from "react-native-root-toast";

import { Colors } from "../../constants/styles";
import { AuthContext } from "../../store/AuthContext";
import { confirmBookingRequest } from "../../util/Auth";

function ProfessionalListItem({
  id,
  category,
  cost,
  professional_user_name,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
}) {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: `${category} List`,
    });
  }, [navigation, category]);

  const token = authCtx.token;
  const startTime = `${selectedDate} ${selectedStartTime}`;
  const endTime = `${selectedDate} ${selectedEndTime}`;

  async function handleConfirmBookingRequest(token) {
    try {
      const booking = await confirmBookingRequest(
        id,
        startTime,
        endTime,
        token
      );
      if (booking) {
        authCtx.setBookingByMe(booking);
        navigation.navigate("MyBookingList");
        Toast.show("Booking Successful", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Booking failed!",
        "Something went wrong. Please try again later!"
      );
    }
  }

  async function confirmBooking() {
    try {
      if (!authCtx.isAuthenticated) {
        Alert.alert("Not Authenticated !!", "Take me to login?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes, Please",
            onPress: () =>
              navigation.navigate("Login", {
                callBackFunction: handleConfirmBookingRequest,
              }),
          },
        ]);
      } else {
        handleConfirmBookingRequest(token);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Booking failed!",
        "Something went wrong. Please try again later!"
      );
    }
  }

  function workerDetailHandler() {
    {
      Alert.alert("Confirm Booking!", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => confirmBooking() },
      ]);
    }
  }
  return (
    <Pressable
      onPress={workerDetailHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.listItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {professional_user_name ? professional_user_name : "xyz"}
          </Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.amount}>{`$${cost}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ProfessionalListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  listItem: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  costContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});

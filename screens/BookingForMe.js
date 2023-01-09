import { View, StyleSheet } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/styles";
import { getProfUserBookings } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import WaitingBookingForMeList from "../components/ui/WaitingBookingForMeList";
import ConfirmedBookingForMeList from "../components/ui/ConfirmedBookingForMeList";
import Button from "../components/ui/Button";

function BookingForMe() {
  const [bookings, setBookings] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        try {
          const bookings = await getProfUserBookings(token);
          setBookings(bookings);
        } catch (e) {
          // Handle error
        }
      };

      fetchBookings();

      return () => {};
    }, [])
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "B"
  );

  const awaitingConfirmationBookings = bookings.filter(
    (booking) => booking.status === "W"
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "C"
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status === "D"
  );
  return (
    <View style={styles.container}>
      <WaitingBookingForMeList bookings={awaitingConfirmationBookings} />
      <ConfirmedBookingForMeList bookings={confirmedBookings} />
      <View style={styles.btn}>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              navigation.navigate("CancelledOrConfirmedBookingListScreen", {
                bookings: cancelledBookings,
                header: "Cancelled Booking List",
              });
            }}
          >
            Show Cancelled Bookings
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              navigation.navigate("CancelledOrConfirmedBookingListScreen", {
                bookings: completedBookings,
                header: "Completed Booking List",
              });
            }}
          >
            Show Completed Bookings
          </Button>
        </View>
      </View>
    </View>
  );
}

export default BookingForMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    marginLeft: 20,
  },
  buttons: {
    width: "50%",
    paddingLeft: 5,
    paddingRight: 5,
  },
  btn: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

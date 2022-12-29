import { Text, FlatList, View, StyleSheet } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../constants/styles";
import { getProfUserBookings } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import BookingListItem from "../components/ui/BookingListItem";
import WaitingBookingForMeList from "../components/ui/WaitingBookingForMeList";
import ConfirmedBookingForMeList from "../components/ui/ConfirmedBookingForMeList";

function renderBookingItem(itemData) {
  return (
    <BookingListItem
      id={itemData.item.id}
      profession={itemData.item.professional_type_name}
      name={itemData.item.general_user_name}
      startTime={itemData.item.start_at}
      endTime={itemData.item.end_at}
      cost={itemData.item.cost}
    />
  );
}

function BookingForMe() {
  const [bookings, setBookings] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

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
  return (
    <View style={styles.container}>
      <WaitingBookingForMeList bookings={awaitingConfirmationBookings} />
      <ConfirmedBookingForMeList bookings={confirmedBookings} />
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
});

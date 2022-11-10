import { Text, FlatList, View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Colors } from "../constants/styles";
import { getProfUserBookings } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import BookingListItem from "../components/ui/BookingListItem";

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

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getProfUserBookings(token);
      setBookings(bookings);
    };

    fetchBookings().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
      />
    </View>
  );
}

export default BookingForMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});

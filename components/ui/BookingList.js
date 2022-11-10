import { Text, FlatList, View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/styles";
import { getMyBookings } from "../../util/Auth";
import { AuthContext } from "../../store/AuthContext";
import BookingListItem from "../ui/BookingListItem";

function renderBookingItem(itemData) {
  return (
    <BookingListItem
      id={itemData.item.id}
      profession={itemData.item.professional_type_name }
      name={itemData.item.professional_user_name}
      startTime={itemData.item.start_at}
      endTime={itemData.item.end_at}
      cost={itemData.item.cost}
    />
  );
}

function BookingList() {
  
  const authCtx = useContext(AuthContext);
  const [bookings, setBookings] = useState(authCtx.bookingByMe);
  const token = authCtx.token;

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getMyBookings(token);
      setBookings(bookings);
    };

    fetchBookings().catch(console.error);
  }, [authCtx]);

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

export default BookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});
import { Text, FlatList, View, StyleSheet } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { getMyBookings } from "../../util/Auth";
import { AuthContext } from "../../store/AuthContext";
import MyBookingListItem from "./MyBookingListItem";

function renderBookingItem(itemData) {
  return (
    <MyBookingListItem
      id={itemData.item.id}
      profession={itemData.item.professional_type_name}
      name={itemData.item.professional_user_name}
      startTime={itemData.item.start_at}
      endTime={itemData.item.end_at}
      cost={itemData.item.cost}
      status={itemData.item.long_status_name}
      shortStatus={itemData.item.status}
      review={itemData.item.review}
    />
  );
}

function BookingList() {
  const authCtx = useContext(AuthContext);
  const [bookings, setBookings] = useState(authCtx.bookingByMe);
  const token = authCtx.token;

  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        try {
          const bookings = await getMyBookings(token);
          setBookings(bookings);
        } catch (e) {
          // Handle error
          console.log(e);
        }
      };

      fetchBookings();

      return () => {};
    }, [authCtx])
  );

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

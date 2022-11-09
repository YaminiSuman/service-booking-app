import { Text, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";

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
  const [bookings, setBookings] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getMyBookings(token);
      setBookings(bookings);
    };

    fetchBookings().catch(console.error);
  }, []);

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={renderBookingItem}
    />
  );
}

export default BookingList;

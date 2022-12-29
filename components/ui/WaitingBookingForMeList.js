import { Text, FlatList, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import WaitingBookingListItem from "../../components/ui/WaitingBookingListItem";

function renderBookingItem(itemData) {
  return (
    <WaitingBookingListItem
      id={itemData.item.id}
      profession={itemData.item.professional_type_name}
      name={itemData.item.general_user_name}
      startTime={itemData.item.start_at}
      endTime={itemData.item.end_at}
      cost={itemData.item.cost}
    />
  );
}

function WaitingBookingForMeList({ bookings }) {
  if (!!bookings.length) {
    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          ListHeaderComponent={() => {
            return <Text style={styles.textStatus}>Awaiting Confirmation</Text>;
          }}
        />
      </View>
    );
  }
  return null;
}

export default WaitingBookingForMeList;

const styles = StyleSheet.create({
  container: {
    maxHeight:350,
    backgroundColor: Colors.primary100,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    marginLeft: 20,
    fontSize: 16,
  },
});

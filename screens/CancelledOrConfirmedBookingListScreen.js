import { FlatList, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { Colors } from "../constants/styles";
import CancelledOrConfirmedListItem from "../components/ui/CancelledOrConfirmListItem";

function renderBookingItem(itemData) {
  return (
    <CancelledOrConfirmedListItem
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

function CancelledOrConfirmedBookingListScreen({ route }) {
  const bookings = route.params.bookings;
  const header = route.params.header;
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `${header}`,
    });
  }, [navigation]);

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

export default CancelledOrConfirmedBookingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});

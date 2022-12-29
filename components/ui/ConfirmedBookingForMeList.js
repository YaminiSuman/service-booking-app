import { Text, FlatList, View, StyleSheet } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";
import BookingListItem from "../../components/ui/BookingListItem";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

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

function ConfirmedBookingForMeList({ bookings }) {
  if (!!bookings.length) {
    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          ListHeaderComponent={() => {
            return <Text style={styles.textStatus}>{i18n.t("Confirmed Booking")}</Text>;
          }}
        />
      </View>
    );
  }
  return null;
}

export default ConfirmedBookingForMeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    marginLeft: 20,
    fontSize: 16,
  },
});

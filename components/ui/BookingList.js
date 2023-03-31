import {  FlatList, View, StyleSheet,Text } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";
import { getMyBookings } from "../../util/Auth";
import { AuthContext } from "../../store/AuthContext";
import MyBookingListItem from "./MyBookingListItem";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
  ? "ca-app-pub-2257380265518883/4188240953"
  : "ca-app-pub-2257380265518883/5280629720";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

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
  const [bookings, setBookings] = useState([]);
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

  if (!bookings.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.title}> {i18n.t("No bookings at the moment")}</Text>
        <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      </View>
    );

  } else {  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );}

}

export default BookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.primary100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

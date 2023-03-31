import { View, StyleSheet } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { I18n } from "i18n-js";
import { Platform } from "react-native";

import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import { getProfUserBookings } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import WaitingBookingForMeList from "../components/ui/WaitingBookingForMeList";
import ConfirmedBookingForMeList from "../components/ui/ConfirmedBookingForMeList";
import Button from "../components/ui/Button";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
  ? "ca-app-pub-2257380265518883/2280262910"
  : "ca-app-pub-2257380265518883/9341812590";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

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
                header: i18n.t("Cancelled Booking List"),
              });
            }}
          >
            {i18n.t("Show Cancelled Bookings")}
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              navigation.navigate("CancelledOrConfirmedBookingListScreen", {
                bookings: completedBookings,
                header: i18n.t("Completed Booking List"),
              });
            }}
          >
            {i18n.t("Show Completed Bookings")}
          </Button>
        </View>
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
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

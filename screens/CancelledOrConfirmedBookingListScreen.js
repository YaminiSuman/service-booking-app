import { FlatList, View, StyleSheet,Text } from "react-native";
import { useEffect } from "react";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import CancelledOrConfirmedListItem from "../components/ui/CancelledOrConfirmListItem";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/4253137444";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

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

function CancelledOrConfirmedBookingListScreen({ navigation, route }) {
  const bookings = route.params.bookings;
  const header = route.params.header;

  useEffect(() => {
    navigation.setOptions({
      title: `${header}`,
    });
  }, [navigation]);

  if (!bookings.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.title}> {i18n.t("No bookings at the moment")}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
        />
        {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      </View>
    );
  }
}

export default CancelledOrConfirmedBookingListScreen;

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

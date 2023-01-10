import { FlatList, View, StyleSheet, ScrollView,Text } from "react-native";
import { useState, useEffect } from "react";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import { getMyReviews } from "../util/Auth";
import ReviewListItem from "../components/ui/ReviewListItem";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/7645587540";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function renderReviewItem(itemData) {
  return (
    <ReviewListItem
      id={itemData.item.id}
      name={itemData.item.name}
      review={itemData.item.review}
      date={itemData.item.date}
    />
  );
}

function ReviewScreen({ navigation, route }) {
  const profId = route.params.profId;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getMyReviews(profId);
      setReviews(reviews);
    };

    fetchReviews().catch(console.error);
  }, []);

  if (!reviews.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.title}> {i18n.t("No reviews at the moment")}</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReviewItem}
          />
          {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
        </View>
      </ScrollView>
    );
  }
}

export default ReviewScreen;

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

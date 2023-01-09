import { StyleSheet, View, Alert, TextInput } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/AuthContext";
import { submitBookingReview } from "../util/Auth";

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

function SubmitReviewScreen({ route }) {
  const id = route.params.bookingId;
  const navigation = useNavigation();
  const [review, setReview] = useState("");
  const authCtx = useContext(AuthContext);

  async function handleSubmitReview() {
    try {
      if (review.length < 5) {
        Alert.alert(i18n.t("Review is too short"));
      } else {
        const token = authCtx.token;
        const res = await submitBookingReview(id, review, token);

        if (res) {
          Toast.show(i18n.t("Review submitted successfully"), {
            duration: Toast.durations.LONG,
          });
          navigation.navigate("Categories");
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Something went wrong"),
        i18n.t("Could not submit review. Please try again later!")
      );
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("Please enter your review comments")}
        value={review}
        onChangeText={setReview}
        multiline="true"
      />

      <View style={styles.buttons}>
        <Button onPress={handleSubmitReview}>{i18n.t("Submit Review")}</Button>
      </View>
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

export default SubmitReviewScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  input: {
    paddingVertical: 28,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 8,
  },
  buttons: {
    marginTop: 10,
  },
});

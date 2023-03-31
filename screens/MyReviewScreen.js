import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { Platform } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
  ? "ca-app-pub-2257380265518883/8388970724"
  : "ca-app-pub-2257380265518883/6232425413";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function MyReviewScreen({ navigation, route }) {
  const review = route.params.review;
  const time = route.params.time;
  const user = route.params.user;
  const navigateToCategory = () => {
    navigation.navigate("Categories");
  };

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.nameLabelText}>
          {user} {i18n.t("says:")}
        </Text>

        <Text style={styles.instructionText}>{review}</Text>
        <Text style={styles.nameLabelText}>
          {i18n.t("For the booking at ")}

          {time}
        </Text>
        <View style={styles.buttons}>
          <Button onPress={navigateToCategory}>
            {i18n.t("Take me back!")}
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

export default MyReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
  },
  inputContainer: {
    padding: 30,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  nameLabelText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 17,

    color: Colors.primary50,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 7,
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    marginTop: 15,
  },
});

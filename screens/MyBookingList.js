import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { Platform } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { AuthContext } from "../store/AuthContext";
import BookingList from "../components/ui/BookingList";
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
  ? "ca-app-pub-2257380265518883/9702052394"
  : "ca-app-pub-2257380265518883/1080179190";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function DefaultBookingInfo() {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate("Login", {
      redirectScreenName: "MyBookingList",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>
          {i18n.t("Log in to see your bookings")}
        </Text>
        <View style={styles.buttons}>
          <Button onPress={navigateToLogin}>
            {i18n.t("Take me to Login")}
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

function MyBookingList() {
  const authCtx = useContext(AuthContext);
  return !authCtx.isAuthenticated ? <DefaultBookingInfo /> : <BookingList />;
}

export default MyBookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
  },
  inputContainer: {
    padding: 55,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    alignSelf: "center",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    marginTop: 15,
  },
});

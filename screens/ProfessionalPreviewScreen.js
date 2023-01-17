import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { Base_URL } from "../util/Auth";
import { SaveImageToDevice } from "../util/SaveImageToDevice";
import { AuthContext } from "../store/AuthContext";
import { confirmBookingRequest } from "../util/Auth";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/6524077563";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

const prefixForImageURI = Base_URL.replace("/api", "");

function ProfessionalPreviewScreen({ route }) {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const id = route.params.id;
  const category = route.params.category;
  const cost = route.params.cost;
  const professional_user_name = route.params.professional_user_name;
  const selectedDate = route.params.selectedDate;
  const selectedStartTime = route.params.selectedStartTime;
  const selectedEndTime = route.params.selectedEndTime;
  const business_logo = route.params.business_logo;
  const certificate = route.params.certificate;
  const note_text = route.params.note_text;

  const logoURI = `${prefixForImageURI}${business_logo}`;
  const certURI = `${prefixForImageURI}${certificate}`;

  const startTime = `${selectedDate} ${selectedStartTime}`;
  const endTime = `${selectedDate} ${selectedEndTime}`;

  async function handleConfirmBookingRequest(token) {
    try {
      const booking = await confirmBookingRequest(
        id,
        startTime,
        endTime,
        token
      );
      if (booking) {
        authCtx.setBookingByMe(booking);
        navigation.navigate("MyBookingList");
        Toast.show(i18n.t("Booking Successful"), {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Booking failed!"),
        i18n.t("Something went wrong. Please try again later!")
      );
    }
  }

  async function confirmBooking() {
    try {
      if (!authCtx.isAuthenticated) {
        Alert.alert(
          i18n.t("Not Authenticated !!"),
          i18n.t("Take me to login?"),
          [
            {
              text: i18n.t("Cancel"),
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: i18n.t("Yes, please"),
              onPress: () =>
                navigation.navigate("Login", {
                  callBackFunction: handleConfirmBookingRequest,
                }),
            },
          ]
        );
      } else {
        handleConfirmBookingRequest(token);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Booking failed!"),
        i18n.t("Something went wrong. Please try again later!")
      );
    }
  }

  function showReview() {
    navigation.navigate("ReviewScreen", {
      profId: id,
    });
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.rootContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Name")}</Text>
            <Text style={[styles.title, { marginLeft: 92 }]}>
              {professional_user_name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Cost")}</Text>
            <Text style={[styles.title, { marginLeft: 50 }]}>Kz {cost}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Category")}</Text>
            <Text style={[styles.title, { marginLeft: 65 }]}>{category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Booking Date")}</Text>
            <Text style={styles.title}>{selectedDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Start Time")}</Text>
            <Text style={[styles.title, { marginLeft: 35 }]}>
              {selectedStartTime}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("End Time")}</Text>
            <Text style={[styles.title, { marginLeft: 35 }]}>
              {selectedEndTime}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("Notes")}</Text>
            <Text style={[styles.title, { marginLeft: 30 }]}>
              {note_text ? note_text : i18n.t("None")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => SaveImageToDevice(logoURI)}>
            <View style={styles.column} onPress={() => console.log("clicked")}>
              <Text style={styles.ImageLabel}>{i18n.t("Business Logo")}</Text>
              <Image source={{ uri: logoURI }} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => SaveImageToDevice(certURI)}>
            <View style={styles.column} onPress={() => console.log("clicked")}>
              <Text style={[styles.ImageLabel, { marginLeft: 120 }]}>{i18n.t("Certificate")}</Text>
              <Image source={{ uri: certURI }} style={styles.image} />
            </View>
          </TouchableOpacity>

          <View style={styles.buttons}>
            <Button onPress={() => showReview()}>
              {i18n.t("Show Reviews")}
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => confirmBooking()}>
              {i18n.t("Confirm Booking")}
            </Button>
          </View>
        </View>
      </ScrollView>
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

export default ProfessionalPreviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  column: {
    justifyContent: "center",
    alignContent: "center",
  },
  label: {
    fontSize: 18,
    color: "#ddd7d7",
    marginBottom: 8,
    marginRight: 15,
  },
  ImageLabel: {
    fontSize: 18,
    color: "#ddd7d7",
    marginBottom: 5,
    marginLeft: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
    color: "white",
    flex: 1,
    flexWrap: "wrap",
  },
  buttons: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "75%",
    height: 100,
    marginLeft: 40,
    marginBottom: 20,
  },
});

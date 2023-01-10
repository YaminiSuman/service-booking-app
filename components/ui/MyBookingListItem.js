import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";
import { patchBookingStatus } from "../../util/Auth";
import { AuthContext } from "../../store/AuthContext";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function MyBookingListItem({
  id,
  profession,
  name,
  startTime,
  endTime,
  cost,
  status,
  shortStatus,
  review,
}) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();

  function cancelAwaitedBooking() {
    {
      {
        Alert.alert(i18n.t("Cancel this Booking"), i18n.t("Are you sure?"), [
          { text: i18n.t("No, not yet"), style: "cancel" },
          {
            text: i18n.t("Yes, cancel"),
            onPress: () =>
              patchBookingStatus("C", token, id, "byMe").then(
                navigation.navigate("Categories")
              ),
          },
        ]);
      }
    }
  }

  function handleBookingClick(Status) {
    console.log("status", shortStatus);
    if (shortStatus == "B" || shortStatus == "W") {
      cancelAwaitedBooking();
    }
    if (shortStatus == "D" && review == null) {
      console.log("navigate to submit review screen");
      navigation.navigate("SubmitReviewScreen", { bookingId: id });
    }
    if (shortStatus == "D" && review !== null) {
      console.log("Review already submitted");
      Toast.show(i18n.t("Review already submitted"), {
        duration: Toast.durations.LONG,
      });
    }
    if (shortStatus == "C") {
      console.log("status cancelled, nothing to do");
    }
  }

  return (
    <Pressable
      onPress={handleBookingClick}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.listItem}>
        <View>
          {status && <Text style={styles.textStatus}>{status}</Text>}
          <Text style={styles.description} numberOfLines={1}>
            {`${name} (${profession})`}
          </Text>
          <Text style={styles.textBase}>{startTime}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.amount}>{`Kz${cost}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default MyBookingListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  listItem: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary50,
    marginRight: 5,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  description: {
    color: Colors.primary50,
    marginRight: 5,
    width: 200,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  costContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});

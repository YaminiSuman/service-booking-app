import { StyleSheet, Text, View, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;


function CancelledOrConfirmedListItem({
  id,
  profession,
  name,
  startTime,
  endTime,
  cost,
  status,
  shortStatus,
  general_user_name,
  review,
}) {

  const navigation = useNavigation();
  function navigateToReviewScreen() {
    if (shortStatus === "D") {
      navigation.navigate("MyReviewScreen", {
        review: review,
        time: endTime,
        user: general_user_name,
      });
    }
  }

  return (
    <Pressable
      onPress={navigateToReviewScreen}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.listItem}>
        <View>
          <Text style={styles.description} numberOfLines={1}>
            {`${name} (${profession})`}
          </Text>
          <Text style={styles.textBase}>{startTime}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.amount}>{`Kz ${cost}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default CancelledOrConfirmedListItem;

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

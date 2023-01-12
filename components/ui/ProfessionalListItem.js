import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function ProfessionalListItem({
  id,
  category,
  cost,
  professional_user_name,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
  business_logo,
  certificate,
  note_text,
}) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `${category} ${i18n.t("List")}`,
    });
  }, [navigation, category]);

  function workerDetailHandler() {
    {
      navigation.navigate("ProfessionalPreviewScreen", {
        id,
        category,
        cost,
        professional_user_name,
        selectedDate,
        selectedStartTime,
        selectedEndTime,
        business_logo,
        certificate,
        note_text,
      });
    }
  }
  return (
    <Pressable
      onPress={workerDetailHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.listItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {professional_user_name
              ? professional_user_name
              : i18n.t("no name provided")}
          </Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.amount}>{`Kz ${cost}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ProfessionalListItem;

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
  },
  description: {
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

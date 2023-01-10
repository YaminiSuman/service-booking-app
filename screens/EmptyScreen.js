import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function EmptyScreen({ navigation,route }) {
  const header = route.params.header;
  const text = route.params.text;
  
  useEffect(() => {
    navigation.setOptions({
      title: `${header}`,
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{text}</Text>
      <Text>{i18n.t("Please come back later..!")}</Text>
    </View>
  );
}

export default EmptyScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

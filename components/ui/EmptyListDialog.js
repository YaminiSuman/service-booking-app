import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import Button from "../ui/Button";
import { Colors } from "../../constants/styles";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function EmptyListDialog() {
    const navigation = useNavigation();
      const navigateToCategory = () => {
        navigation.navigate("Categories");
    };
    
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.instructionText}>
          {i18n.t("Professionals not available at the moment")}
        </Text>
        <View style={styles.buttons}>
          <Button onPress={navigateToCategory}>{i18n.t("Take me Back!")}</Button>
        </View>
      </View>
    </View>
  );
}

export default EmptyListDialog;

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
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 7,
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    marginTop: 15,
  },
});

import { StyleSheet, View, Alert, TextInput } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/AuthContext";
import { updateUserPassword } from "../util/Auth";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/1080179190";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function ResetPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authCtx = useContext(AuthContext);

  async function resetPassword() {
    try {
      if (password !== confirmPassword) {
        Alert.alert(i18n.t("Password does not match"));
      } else if (password.length < 5) {
        Alert.alert(i18n.t("Password is too short"));
      } else if (password === confirmPassword) {
        const token = authCtx.token;
        const res = await updateUserPassword(password, token);

        if (res) {
          Toast.show(i18n.t("Password changed successfully"), {
            duration: Toast.durations.LONG,
          });
          navigation.navigate("Categories");
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Something went wrong"),
        i18n.t("Could not update password. Please try again later!")
      );
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("password")}
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("confirm password")}
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttons}>
        <Button onPress={resetPassword}>{i18n.t("Reset Password")}</Button>
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

export default ResetPassword;

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
    paddingVertical: 8,
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

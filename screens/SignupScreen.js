import { useState } from "react";
import { Alert } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/Auth";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, name }) {
    setIsAuthenticating(true);
    try {
      const data = await createUser(email, password, name);

      if (data) {
        Alert.alert(
          i18n.t("Sign up successful !!"),
          i18n.t("Take me to login?"),
          [
            {
              text: i18n.t("Cancel"),
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: i18n.t("Yes, please"),
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        Alert.alert(
          i18n.t("Email already exists"),
          i18n.t(
            "Could not create user, please check your input and try again later."
          )
        );
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Authentication failed!"),
        i18n.t(
          "Could not create user, please check your input and try again later."
        )
      );
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={i18n.t("USER_IN_CREATION")} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

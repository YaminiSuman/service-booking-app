import { useState, useContext } from "react";
import { Alert } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import { loginUser } from "../util/Auth";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

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
              onPress: async () => {
                setIsAuthenticating(true);
                try {
                  const loginData = await loginUser(email, password, authCtx.fcmToken);
                  if (loginData.token) {
                    authCtx.authenticate(loginData.token, loginData.is_prof_user, loginData.user_name, loginData.user_id);
                    navigation.navigate("Categories");
                  }
                } catch (error) {
                  console.log(error.message);
                  Alert.alert(i18n.t("Authentication failed!"), i18n.t("INVALID_CREDENTIALS"));
                }
                setIsAuthenticating(false);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          i18n.t("Email already exists"),
          i18n.t(
            "Signup_Error"
          )
        );
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(i18n.t("Authentication failed!"), i18n.t("Signup_Error"));
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={i18n.t("USER_IN_CREATION")} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

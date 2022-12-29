import { useState, useContext } from "react";
import { Alert } from "react-native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";
import { loginUser } from "../util/Auth";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function LoginScreen({ navigation, route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const redirectScreenName = route.params?.redirectScreenName;
  const callBackFunction = route.params?.callBackFunction;
  const fcmToken = authCtx.fcmToken;
 
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const data = await loginUser(email, password, fcmToken);
      if (data.token) {
        authCtx.authenticate(data.token, data.is_prof_user, data.user_name);
        if (!redirectScreenName) {
          navigation.navigate("Categories");
        }
      }

      if (redirectScreenName) {
        navigation.navigate(redirectScreenName);
      }
      if (callBackFunction) {
        callBackFunction(data.token);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(i18n.t("Authentication failed!"), i18n.t("Could not log you in. Please check your credentials or try again later!"));
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={i18n.t("Logging in...")} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";
import { loginUser } from "../util/Auth";

function LoginScreen({ navigation, route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const redirectScreenName = route.params?.redirectScreenName;
  const callBackFunction = route.params?.callBackFunction;
  const fcmToken = authCtx.fcmToken;
  console.log("fcmToken", fcmToken);
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const data = await loginUser(email, password, fcmToken);
      if (data.token) {
        authCtx.authenticate(data.token, data.is_prof_user);
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
      Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again later!");
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

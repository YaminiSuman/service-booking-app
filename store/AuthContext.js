import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  profUser: false,
  isAuthenticated: false,
  bookingByMe: [],
  fcmToken: "",
  authenticate: (token) => {},
  logout: () => {},
  setProfUser: () => {},
  setBookingByMe: () => {},
  setFcmToken: () => { },
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isProfUser, setIsProfUser] = useState(false);
  const [pushNotificationToken, updatePushNotificationToken] = useState(null);

  const [bookingByMe, updateBookingByMe] = useState([]);

  function authenticate(token, isProfUser) {
    setAuthToken(token);
    setProfUser(isProfUser);
    AsyncStorage.setItem("token", token);
    if (JSON.stringify(isProfUser)) {
      AsyncStorage.setItem("isProfUser", JSON.stringify(isProfUser));
    }
  }

  function setFcmToken(token) {
    updatePushNotificationToken(token);
  }

  function logout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("isProfUser");
    setAuthToken(null);
  }

  function setProfUser(isProfUser) {
    setIsProfUser(isProfUser);
  }

  function setBookingByMe(booking) {
    updateBookingByMe([...bookingByMe, booking]);
  }

  const value = {
    token: authToken,
    profUser: isProfUser,
    isAuthenticated: !!authToken,
    fcmToken: pushNotificationToken,
    authenticate: authenticate,
    logout: logout,
    setProfUser: setProfUser,
    setBookingByMe: setBookingByMe,
    setFcmToken: setFcmToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

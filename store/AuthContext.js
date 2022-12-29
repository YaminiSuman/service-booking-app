import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  profUser: false,
  isAuthenticated: false,
  bookingByMe: [],
  fcmToken: "",
  userName: "",
  authenticate: (token) => {},
  logout: () => {},
  setProfUser: () => {},
  setBookingByMe: () => {},
  setFcmToken: () => {},
  setUserName: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isProfUser, setIsProfUser] = useState(false);
  const [pushNotificationToken, updatePushNotificationToken] = useState(null);

  const [bookingByMe, updateBookingByMe] = useState([]);
  const [user, setUser] = useState("");
  function authenticate(token, isProfUser, userName) {
    setAuthToken(token);
    setProfUser(isProfUser);
    setUserName(userName);
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

  function setUserName(userName) {
    setUser(userName);
  }
  const value = {
    token: authToken,
    profUser: isProfUser,
    isAuthenticated: !!authToken,
    fcmToken: pushNotificationToken,
    userName: user,
    authenticate: authenticate,
    logout: logout,
    setProfUser: setProfUser,
    setBookingByMe: setBookingByMe,
    setFcmToken: setFcmToken,
    setUserName: setUserName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

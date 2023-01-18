import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  profUser: false,
  isAuthenticated: false,
  bookingByMe: [],
  fcmToken: "",
  userName: "",
  userId: "",
  authenticate: (token, isProfUser, userName, user_id) => {},
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
  const [userId, setUserId] = useState("");

  function authenticate(token, isProfUser, userName, userId) {
    setAuthToken(token);
    setProfUser(isProfUser);
    setUserName(userName);
    setIdForUser(userId);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userName", userName);
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
    AsyncStorage.removeItem("userName");
    AsyncStorage.removeItem("userId");
    setAuthToken(null);
  }

  function setProfUser(isProfUser) {
    setIsProfUser(isProfUser);
    AsyncStorage.setItem("isProfUser", JSON.stringify(isProfUser));
  }

  function setBookingByMe(booking) {
    updateBookingByMe([...bookingByMe, booking]);
  }

  function setUserName(userName) {
    setUser(userName);
    AsyncStorage.setItem("userName", userName);
  }

  function setIdForUser(userId) {
    setUserId(userId);
    AsyncStorage.setItem("userId", JSON.stringify(userId));
  }

  const value = {
    token: authToken,
    profUser: isProfUser,
    isAuthenticated: !!authToken,
    fcmToken: pushNotificationToken,
    userName: user,
    userId: userId,
    authenticate: authenticate,
    logout: logout,
    setProfUser: setProfUser,
    setBookingByMe: setBookingByMe,
    setFcmToken: setFcmToken,
    setUserName: setUserName,
    setIdForUser: setIdForUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

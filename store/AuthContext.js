import { createContext, useState } from "react";

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
  setFcmToken: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isProfUser, setIsProfUser] = useState(false);
  const [pushNotificationToken, updatePushNotificationToken] = useState(null);

  const [bookingByMe, updateBookingByMe] = useState([]);

  function authenticate(token) {
    setAuthToken(token);
  }

  function setFcmToken(token) {
    updatePushNotificationToken(token);
  }

  function logout() {
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

import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  profUser: false,
  isAuthenticated: false,
  bookingByMe: [],
  authenticate: (token) => {},
  logout: () => {},
  setProfUser: () => {},
  setBookingByMe: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isProfUser, setIsProfUser] = useState(false);

  const [bookingForMe, updateBookingForMe] = useState([]);
  const [bookingByMe, updateBookingByMe] = useState([]);

  function authenticate(token) {
    setAuthToken(token);
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
    authenticate: authenticate,
    logout: logout,
    setProfUser: setProfUser,
    setBookingByMe: setBookingByMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

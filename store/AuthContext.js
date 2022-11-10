import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  profUser: false,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  setProfUser:()=>{},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isProfUser, setIsProfUser] = useState(false);

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  function setProfUser(isProfUser) {
    setIsProfUser(isProfUser);
  }

  const value = {
    token: authToken,
    profUser: isProfUser,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setProfUser: setProfUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

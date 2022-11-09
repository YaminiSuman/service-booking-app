import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../store/AuthContext";
import BookingList from "../components/ui/BookingList";

function MyBookingList() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  if (!authCtx.isAuthenticated) {
    return navigation.navigate("Login", {
      redirectScreenName: "MyBookingList",
    });
  } else return <BookingList />;
}

export default MyBookingList;

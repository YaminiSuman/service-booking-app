import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { AuthContext } from "../../store/AuthContext";
import { patchBookingStatus } from "../../util/Auth";

function WaitingBookingListItem({
  id,
  profession,
  name,
  startTime,
  endTime,
  cost,
  status,
}) {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const token = authCtx.token;
  function workerDetailHandler() {
    {
      Alert.alert("Update Booking Status", "Are you sure?", [
        {
          text: "Reject",
          onPress: () =>
            patchBookingStatus("C", token, id).then(
              navigation.navigate("Categories")
            ),
        },
        {
          text: "Confirm",
          onPress: () =>
            patchBookingStatus("B", token, id).then(
              navigation.navigate("Categories")
            ),
        },
        { text: "Maybe later", style: "cancel" },
      ]);
    }
  }

  return (
    <Pressable
      onPress={workerDetailHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.listItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {`${name} - (${profession})`}
          </Text>
          <Text style={styles.textBase}>{startTime}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.amount}>{`$${cost}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default WaitingBookingListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  listItem: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary50,
    marginRight: 5,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  costContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});

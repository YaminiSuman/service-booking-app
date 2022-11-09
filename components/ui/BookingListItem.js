import { Pressable, StyleSheet, Text, View, Alert } from "react-native";

import { Colors } from "../../constants/styles";

function BookingListItem({
  id,
  profession,
  name,
  startTime,
  endTime,
}) {
  return (
    <View style={styles.listItem}>
      <View>
        <Text style={[styles.textBase, styles.description]}>
          {name ? name : "xyz"}
        </Text>
        <Text style={styles.textBase}>{startTime}</Text>
      </View>
      {/* <View style={styles.costContainer}>
        <Text style={styles.amount}>{`$${cost}`}</Text>
      </View> */}
    </View>
  );
}

export default BookingListItem;

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

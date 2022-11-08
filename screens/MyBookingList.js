import { StyleSheet, Text, View } from "react-native";

function MyBookingList() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome to Booking screen!</Text>
    </View>
  );
}

export default MyBookingList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

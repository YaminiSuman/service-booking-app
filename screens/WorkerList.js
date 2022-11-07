import { StyleSheet, Text, View } from "react-native";

function WorkerList({ route }) {
  console.log(route.params)
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>worker list screen!</Text>
    </View>
  );
}

export default WorkerList;

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

import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

function ReviewListItem({ name, review, date }) {
  return (
    <View style={styles.listItem}>
      <View style={styles.row}>
        <Text style={styles.textStatus}>{name}</Text>
        <Text style={styles.textStatus}>{date}</Text>
      </View>

      <Text style={styles.description} multiline="true">
        {review}
      </Text>
    </View>
  );
}

export default ReviewListItem;

const styles = StyleSheet.create({
  listItem: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary500,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 5,
  },
  description: {
    color: Colors.primary50,
    fontSize: 16,
  },
});

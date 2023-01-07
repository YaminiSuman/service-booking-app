import { FlatList, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../constants/styles";
import { getMyReviews } from "../util/Auth";
import ReviewListItem from "../components/ui/ReviewListItem";

function renderReviewItem(itemData) {
  return (
    <ReviewListItem
      id={itemData.item.id}
      name={itemData.item.name}
      review={itemData.item.review}
      date={itemData.item.date}
    />
  );
}

function ReviewScreen({ route }) {
  const profId = route.params.profId;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getMyReviews(profId);
      setReviews(reviews);
    };

    fetchReviews().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
      />
    </View>
  );
}

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});

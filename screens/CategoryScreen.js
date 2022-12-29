import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CategoryGridTile from "../components/ui/CategoryGridTile";
import { Colors } from "../constants/styles";
import { getCategories } from "../util/Auth";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-2257380265518883/6232425413";

function renderCategoryItem(itemData) {
  return (
    <CategoryGridTile
      id={itemData.item.id}
      title={itemData.item.name}
      color={Colors.primary500}
      icon={itemData.item.icon}
    />
  );
}

function CategoriesScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});

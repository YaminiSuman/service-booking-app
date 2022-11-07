import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/ui/CategoryGridTile";
import { Colors } from "../constants/styles";
import { getCategories } from "../util/Auth";

function renderCategoryItem(itemData) {
  return (
    <CategoryGridTile id={ itemData.item.id} title={itemData.item.name} color={Colors.primary500} icon={itemData.item.icon} />
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
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;

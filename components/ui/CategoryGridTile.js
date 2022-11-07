import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import IconButton from "../ui/IconButton";
import ServiceInputModal from "./ServiceInputModal";
import { useNavigation } from "@react-navigation/native";

function CategoryGridTile({ id, title, color, icon }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [serviceCategoryId, setServiceCategoryId] = useState(null);

  const handleServiceWorkers = (workerDetails) => {
    navigation.navigate("ProfessionalList", {
      workerDetails: workerDetails,
    });
  };

  const openCategoryModal = () => {
    setIsModalVisible(true);
    setServiceCategoryId(id);
  };

  const closeCategoryModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={openCategoryModal}
        >
          <View style={[styles.innerContainer, { backgroundColor: color }]}>
            <IconButton icon={icon} color="white" size={24} />
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
      {isModalVisible && (
        <ServiceInputModal
          visible={isModalVisible}
          onCancel={closeCategoryModal}
          id={serviceCategoryId}
          handleServiceWorkers={handleServiceWorkers}
        />
      )}
    </>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 120,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

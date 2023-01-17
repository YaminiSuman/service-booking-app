import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

import FlatButton from "./FlatButton";

export default function ImagePicker({ textToShow, handleCallback, img }) {
  const [image, setImage] = useState(img);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleCallback(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={styles.button}>
        <FlatButton onPress={pickImage}>{textToShow}</FlatButton>
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    width: "75%",
    height: 100,
    marginLeft: 35,
  },
});

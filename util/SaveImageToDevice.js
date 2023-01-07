import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-root-toast";

export const SaveImageToDevice = (uri) => {
  MediaLibrary.saveToLibraryAsync(uri).then(() => {console.log("Image Saved")});
  Toast.show("Photo Saved Successfully"), {
    duration: Toast.durations.LONG,
  };
};

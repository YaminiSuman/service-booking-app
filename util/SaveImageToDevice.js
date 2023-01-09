import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

export const SaveImageToDevice = (uri) => {
  MediaLibrary.saveToLibraryAsync(uri).then(() => {
    console.log("Image Saved");
  });
  Toast.show(`${i18n.t("Photo Saved Successfully")}`),
    {
      duration: Toast.durations.LONG,
    };
};

import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/1080179190";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function EmptyScreen({ navigation,route }) {
  const header = route.params.header;
  const text = route.params.text;
  
  useEffect(() => {
    navigation.setOptions({
      title: `${header}`,
    });
  }, [navigation]);

  return (
    <View>
      <View style={styles.rootContainer}>
        <Text style={styles.title}>{text}</Text>
        <Text>{i18n.t("Please come back later..!")}</Text>
      </View>
      {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
    </View>
  );
}

export default EmptyScreen;

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

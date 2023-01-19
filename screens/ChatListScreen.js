import { FlatList, View, StyleSheet, Text, ScrollView } from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import { getAllChats } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import ChatListItem from "../components/ui/ChatListItem";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/5280629720";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function renderChatItem(itemData) {
  return (
    <ChatListItem
      id={itemData.item.id}
      timestamp={itemData.item.created_at}
      message={itemData.item.message}
      otherUserId={itemData.item.other_user_id}
      otherUserName={itemData.item.other_user_name}
    />
  );
}

function ChatListScreen() {
  const authCtx = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const token = authCtx.token;

  useFocusEffect(
    useCallback(() => {
      const fetchChats = async () => {
        try {
          const chats = await getAllChats(token);
          setChats(chats);
        } catch (e) {
          // Handle error
          console.log(e);
        }
      };

      fetchChats();

      return () => {};
    }, [])
  );

  if (!chats.length) {
    return (
      <View>
        <View style={styles.rootContainer}>
          <Text style={styles.title}> {i18n.t("No chats at the moment")}</Text>
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
  } else {
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
          />
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
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.primary100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

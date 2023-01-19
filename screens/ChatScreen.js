import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { AuthContext } from "../store/AuthContext";
import { getMyMessages, postMyMessage } from "../util/Auth";

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

function ChatScreen({ navigation, route }) {
  const otherUserId = route.params.profId;

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const myUserId = authCtx.userId;
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const messages = await getMyMessages(otherUserId, token);
    setMessages(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const onSend = (newMessages = []) => {
    const text = newMessages[0].text;
    setMessages(GiftedChat.append(messages, newMessages));
    postMyMessage(otherUserId, text, token).then(() =>
      console.log("message sent successfully")
    );
  };

  return (
    <View style={styles.container}>
      {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
      <GiftedChat
        {...{ messages, onSend }}
        user={{
          _id: myUserId,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f7e8e8",
  },
});

export default ChatScreen;

import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { AuthContext } from "../store/AuthContext";
import { getMyMessages, postMyMessage } from "../util/Auth";

function ChatScreen({ navigation, route }) {
  const profId = route.params.profId;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const myUserId = authCtx.userId;

  const [messages, setMessages] = useState([
    // {
    //   _id: 1,
    //   text: "Hello developer",
    //   createdAt: new Date(),
    //   user: {
    //     _id: 2,
    //     name: "Other user",
    //   },
    // },
    // {
    //   _id: 2,
    //   text: "Hello developer",
    //   createdAt: new Date(),
    //   user: {
    //     _id: 1,
    //     name: "Myself",
    //   },
    // },
  ]);

  useEffect(() => {
    const timer = setInterval(async () => {
      const messages = await getMyMessages(profId, token);
      setMessages(messages);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onSend = (newMessages = []) => {
    const text = newMessages[0].text;
    setMessages(GiftedChat.append(messages, newMessages));
    postMyMessage(profId, text, token).then(() =>
      console.log("message sent successfully")
    );
  };

  return (
    <View style={styles.container}>
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

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import { Colors } from "../../constants/styles";
import { AuthContext } from "../../store/AuthContext";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function ChatListItem({
  id,
  timestamp,
  message,
  otherUserId,
  otherUserName,
  sender,
}) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();

  function handleClick() {
    navigation.navigate("ChatScreen", {
      profId: otherUserId,
    });
  }

  return (
    <Pressable
      onPress={handleClick}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <ScrollView>
        <View style={styles.listItem}>
          <View>
            <View style={styles.row}>
              <Text style={styles.textBase}>{otherUserName}</Text>
              <Text style={styles.textStatus}>{timestamp}</Text>
            </View>

            <Text style={styles.description} numberOfLines={1}>
              {message}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
}

export default ChatListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  listItem: {
    width: "90%",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textBase: {
    color: Colors.primary800,
    fontWeight: "bold",
    fontSize: 16,
  },
  textStatus: {
    color: Colors.primary800,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  description: {
    color: Colors.primary50,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});

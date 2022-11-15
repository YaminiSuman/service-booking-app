import { StyleSheet, View, Alert, TextInput } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/AuthContext";
import { updateUserPassword } from "../util/Auth";

function ResetPassword() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authCtx = useContext(AuthContext);

  async function resetPassword() {
    try {
      if (password !== confirmPassword) {
        Alert.alert("Password does not match");
      } else if (password.length < 7) {
        Alert.alert("Password is too short");
      } else if (password === confirmPassword) {
        const token = authCtx.token;
        const res = await updateUserPassword(password, token);

        if (res) {
          Toast.show("Password changed successfully", {
            duration: Toast.durations.LONG,
          });
          navigation.navigate("Categories");
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Something went wrong",
        "Could not update password. Please try again later!"
      );
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="confirm password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttons}>
        <Button onPress={resetPassword}>Reset Password</Button>
      </View>
    </View>
  );
}

export default ResetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 8,
  },
  buttons: {
    marginTop: 10,
  },
});

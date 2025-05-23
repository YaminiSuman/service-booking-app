import { NavigationContainer } from "@react-navigation/native";
import { Alert, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "./i18n/supportedLanguages";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import EmptyScreen from "./screens/EmptyScreen";
import CategoriesScreen from "./screens/CategoryScreen";
import ProfessionalList from "./screens/ProfessionalList";
import MyBookingList from "./screens/MyBookingList";
import { Colors } from "./constants/styles";
import AuthContextProvider from "./store/AuthContext";
import { AuthContext } from "./store/AuthContext";
import IconButton from "./components/ui/IconButton";
import ResetPassword from "./screens/ResetPassword";
import BookingForMe from "./screens/BookingForMe";
import SwitchToProfessional from "./screens/SwitchToProfessional";
import { logout, switchToGenUser } from "./util/Auth";
import ProfessionalPreviewScreen from "./screens/ProfessionalPreviewScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SubmitReviewScreen from "./screens/SubmitReviewScreen";
import CancelledOrConfirmedBookingListScreen from "./screens/CancelledOrConfirmedBookingListScreen";
import MyReviewScreen from "./screens/MyReviewScreen";
import ViewProfileScreen from "./screens/ViewProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatListScreen from "./screens/ChatListScreen";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ProfessionsOverview() {
  const authCtx = useContext(AuthContext);
  const user = authCtx.userName;
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#454443",
        headerLeft: () => (
          <Image
            style={{ width: 50, height: 30, margin: 20 }}
            source={require("./assets/logo.png")}
          />
        ),
        headerRight: ({ tintColor }) => {
          if (authCtx.isAuthenticated) {
            return (
              <IconButton
                icon="settings"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert(
                    `${i18n.t("Hi")} ${user}`,
                    i18n.t("Update Profile?"),
                    [
                      {
                        text: i18n.t("My Profile"),
                        onPress: () => navigation.navigate("ViewProfileScreen"),
                      },
                      {
                        text: i18n.t("View chat history"),
                        onPress: () => navigation.navigate("ChatListScreen"),
                      },
                      {
                        text: i18n.t("Logout"),
                        onPress: () => {
                          Alert.alert(
                            i18n.t("Logout"),
                            i18n.t("Are you sure?"),
                            [
                              {
                                text: i18n.t("Yes, please"),
                                onPress: () => {
                                  logout(authCtx.token).then(authCtx.logout());
                                  navigation.navigate("Categories");
                                },
                              },
                              {
                                text: i18n.t("Cancel"),
                                style: "cancel",
                              },
                            ]
                          );
                        },
                      },
                      {
                        text: i18n.t("Cancel"),
                        style: "cancel",
                      },
                    ],

                    {
                      cancelable: true,
                    }
                  );
                }}
              />
            );
          } else {
            return (
              <IconButton
                icon="login"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert(
                    i18n.t("Have an account?"),
                    i18n.t("Sign up or Login!"),
                    [
                      {
                        text: i18n.t("Login"),
                        onPress: () =>
                          navigation.navigate("Login", {
                            redirectScreenName: "Categories",
                          }),
                      },
                      {
                        text: i18n.t("Cancel"),
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                    ]
                  );
                }}
              />
            );
          }
        },
      })}
    >
      <BottomTabs.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Para Reservas Profissionais",
          tabBarLabel: `${i18n.t("Categories")}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color="white" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MyBookingList"
        component={MyBookingList}
        options={{
          title: `${i18n.t("My Bookings")}`,
          tabBarLabel: `${i18n.t("My Bookings")}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" size={size} color="white" />
          ),
        }}
      />
      {authCtx.profUser && authCtx.token && (
        <BottomTabs.Screen
          name="BookingForMe"
          component={BookingForMe}
          options={{
            title: i18n.t("Booking For Me"),
            tabBarLabel: i18n.t("Booking For Me"),
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="work" size={size} color="white" />
            ),
          }}
        />
      )}
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  const authCtx = useContext(AuthContext);
  const user = authCtx.userName;
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        // screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerLeft: () => (
          <Image
            style={{ width: 50, height: 30, margin: 10 }}
            source={require("./assets/logo.png")}
          />
        ),
        headerRight: ({ tintColor }) => {
          if (authCtx.isAuthenticated) {
            return (
              <IconButton
                icon="settings"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert(
                    `${i18n.t("Hi")} ${user}`,
                    i18n.t("Update Profile?"),
                    [
                      {
                        text: i18n.t("My Profile"),
                        onPress: () => navigation.navigate("ViewProfileScreen"),
                      },
                      {
                        text: i18n.t("View chat history"),
                        onPress: () => navigation.navigate("ChatListScreen"),
                      },
                      {
                        text: i18n.t("Logout"),
                        onPress: () => {
                          Alert.alert(
                            i18n.t("Logout"),
                            i18n.t("Are you sure?"),
                            [
                              {
                                text: i18n.t("Yes, please"),
                                onPress: () => {
                                  logout(authCtx.token).then(authCtx.logout());
                                  navigation.navigate("Categories");
                                },
                              },
                              {
                                text: i18n.t("Cancel"),
                                style: "cancel",
                              },
                            ]
                          );
                        },
                      },
                      {
                        text: i18n.t("Cancel"),
                        style: "cancel",
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
                }}
              />
            );
          } else {
            return (
              <IconButton
                icon="login"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert(
                    i18n.t("Have an account?"),
                    i18n.t("Sign up or Login!"),
                    [
                      {
                        text: i18n.t("Login"),
                        onPress: () =>
                          navigation.navigate("Login", {
                            redirectScreenName: "Categories",
                          }),
                      },
                      {
                        text: i18n.t("Cancel"),
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                    ]
                  );
                }}
              />
            );
          }
        },
      })}
    >
      <Stack.Screen
        name="ProfessionsOverview"
        component={ProfessionsOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessionalList"
        component={ProfessionalList}
        options={{ title: i18n.t("Professional List") }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: i18n.t("Login") }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: i18n.t("Signup") }}
      />
      <Stack.Screen name="EmptyScreen" component={EmptyScreen} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: i18n.t("Reset Password") }}
      />
      <Stack.Screen
        name="SwitchToProfessional"
        component={SwitchToProfessional}
        options={{ title: i18n.t("Update Profession") }}
      />
      <Stack.Screen
        name="ProfessionalPreviewScreen"
        component={ProfessionalPreviewScreen}
        options={{ title: i18n.t("Professional Preview") }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ title: i18n.t("Reviews") }}
      />
      <Stack.Screen
        name="SubmitReviewScreen"
        component={SubmitReviewScreen}
        options={{ title: i18n.t("Submit Review") }}
      />
      <Stack.Screen
        name="CancelledOrConfirmedBookingListScreen"
        component={CancelledOrConfirmedBookingListScreen}
      />
      <Stack.Screen
        name="MyReviewScreen"
        component={MyReviewScreen}
        options={{ title: i18n.t("My Review") }}
      />
      <Stack.Screen
        name="ViewProfileScreen"
        component={ViewProfileScreen}
        options={{ title: i18n.t("My Profile") }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: i18n.t("Update Profile") }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: i18n.t("Chat") }}
      />
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ title: i18n.t("Chat History") }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function configurePushNotifications() {
      messaging()
        .requestPermission()
        .then(() => messaging().getToken())
        .then((token) => {
          console.log("FCM Token:", token);
          authCtx.setFcmToken(token);
        })
        .catch((error) => {
          console.log("Error getting FCM token:", error);
        });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Received background message:", remoteMessage);

        // Set the sound and priority for the notification
        const notification = remoteMessage.notification;
        const sound = notification.sound || "default";

        // Determine the priority for the notification
        let priority;
        if (notification.android) {
          priority = notification.android.priority || "high";
        } else if (notification.ios) {
          priority = notification.ios.priority || "high";
        } else {
          priority = "high";
        }
        // Display the notification
        await messaging().setNotification({
          title: notification.title,
          body: notification.body,
          sound: sound,
          android: {
            priority: priority,
          },
          ios: {
            sound: sound,
            priority: priority,
            _displayInForeground: true,
          },
        });
      });
    }

    async function saveToLibraryPermission() {
      let { status } = await MediaLibrary.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(i18n.t("Permission required"));
        return;
      }
    }

    configurePushNotifications();
    saveToLibraryPermission();
  }, []);
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const profUser = await AsyncStorage.getItem("isProfUser");
      const userName = await AsyncStorage.getItem("userName");
      const userId = await AsyncStorage.getItem("userId");
      if (storedToken) {
        authCtx.authenticate(
          storedToken,
          JSON.parse(profUser),
          userName,
          JSON.parse(userId)
        );
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RootSiblingParent>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </RootSiblingParent>
    </>
  );
}

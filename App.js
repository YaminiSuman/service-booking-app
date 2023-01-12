import { NavigationContainer } from "@react-navigation/native";
import { Alert, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Notifications from "expo-notifications";
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

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

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
                    !authCtx.profUser
                      ? [
                          {
                            text: i18n.t("Reset Password"),
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                          {
                            text: i18n.t("Switch to Professional"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("SWITCH_TO_PROF_USER"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      navigation.navigate(
                                        "SwitchToProfessional"
                                      ),
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
                            text: i18n.t("Logout"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Logout"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      logout(authCtx.token).then(
                                        authCtx.logout()
                                      ),
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
                        ]
                      : [
                          {
                            text: i18n.t("Reset Password"),
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                          {
                            text: i18n.t("Switch to General User"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Switch to General User"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () => {
                                      switchToGenUser(authCtx.token).then(
                                        authCtx.setProfUser(false)
                                      );
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
                            text: i18n.t("Logout"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Logout"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      logout(authCtx.token).then(
                                        authCtx.logout()
                                      ),
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
          title: `${i18n.t("Need For Business")}`,
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
                    !authCtx.profUser
                      ? [
                          {
                            text: i18n.t("Reset Password"),
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                          {
                            text: i18n.t("Switch to Professional"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("SWITCH_TO_PROF_USER"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      navigation.navigate(
                                        "SwitchToProfessional"
                                      ),
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
                            text: i18n.t("Logout"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Logout"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      logout(authCtx.token).then(
                                        authCtx.logout()
                                      ),
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
                        ]
                      : [
                          {
                            text: i18n.t("Reset Password"),
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                          {
                            text: i18n.t("Switch to General User"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Switch to General User"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () => {
                                      switchToGenUser(authCtx.token).then(
                                        authCtx.setProfUser(false)
                                      );
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
                            text: i18n.t("Logout"),
                            onPress: () => {
                              Alert.alert(
                                i18n.t("Logout"),
                                i18n.t("Are you sure?"),
                                [
                                  {
                                    text: i18n.t("Yes, please"),
                                    onPress: () =>
                                      logout(authCtx.token).then(
                                        authCtx.logout()
                                      ),
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
        options={{ title: i18n.t("SWITCH_TO_PROF_USER") }}
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
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          i18n.t("Permission required"),
          i18n.t("Push notifications need the appropriate permissions.")
        );
        return;
      }

      const pushTokenData = (await Notifications.getDevicePushTokenAsync())
        .data;
      authCtx.setFcmToken(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
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
      if (storedToken) {
        authCtx.authenticate(storedToken, JSON.parse(profUser), userName);
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

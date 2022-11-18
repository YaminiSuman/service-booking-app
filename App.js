import { NavigationContainer } from "@react-navigation/native";
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import * as Notifications from "expo-notifications";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
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
import { logout } from "./util/Auth";

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

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#454443",
        headerRight: ({ tintColor }) => {
          if (authCtx.isAuthenticated) {
            return (
              <IconButton
                icon="settings-outline"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert(
                    "Update Profile!",
                    "Are you sure?",
                    !authCtx.profUser
                      ? [
                          {
                            text: "Reset Password",
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                          {
                            text: "Switch to Professional",
                            onPress: () => {
                              Alert.alert(
                                "Switch to Professional account",
                                "Are you sure?",
                                [
                                  {
                                    text: "Yes,Please",
                                    onPress: () =>
                                      navigation.navigate(
                                        "SwitchToProfessional"
                                      ),
                                  },
                                  {
                                    text: "Cancel",
                                    style: "cancel",
                                  },
                                ]
                              );
                            },
                          },
                        {
                          text: "Logout", onPress: () => {
                            logout(authCtx.token).then(authCtx.logout());
                            
                          }
                        },
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                        ]
                      : [
                          {
                            text: "Reset Password",
                            onPress: () => navigation.navigate("ResetPassword"),
                          },
                        {
                          text: "Logout", onPress: () => {
                           logout(authCtx.token).then(authCtx.logout());
                          }
                        },
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                        ]
                  );
                }}
              />
            );
          } else {
            return (
              <IconButton
                icon="power-outline"
                size={24}
                color={tintColor}
                onPress={() => {
                  Alert.alert("Have an account?", "Sign up or Login!", [
                    {
                      text: "Login",
                      onPress: () =>
                        navigation.navigate("Login", {
                          redirectScreenName: "Categories",
                        }),
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                  ]);
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
          title: "Categories",
          tabBarLabel: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color="white" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MyBookingList"
        component={MyBookingList}
        options={{
          title: "My Bookings",
          tabBarLabel: "My Bookings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color="white" />
          ),
        }}
      />
      {authCtx.profUser && authCtx.token && (
        <BottomTabs.Screen
          name="BookingForMe"
          component={BookingForMe}
          options={{
            title: "Booking For Me",
            tabBarLabel: "Booking For Me",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cash-outline" size={size} color="white" />
            ),
          }}
        />
      )}
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="ProfessionsOverview"
        component={ProfessionsOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessionalList"
        component={ProfessionalList}
        options={{ title: "Professional List" }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon="exit" color={tintColor} size={24} />
          ),
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: "Reset Password" }}
      />
      <Stack.Screen
        name="SwitchToProfessional"
        component={SwitchToProfessional}
        options={{ title: "Switch To Professional Account" }}
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
          "Permission required",
          "Push notifications need the appropriate permissions."
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
        });
      }
    }

    configurePushNotifications();
  }, []);
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RootSiblingParent>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </RootSiblingParent>
    </>
  );
}

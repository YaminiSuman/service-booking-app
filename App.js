import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

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

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ProfessionsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary500 },
        tabBarActiveTintColor: "white",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          />
        ),
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
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProfessionalList"
        component={ProfessionalList}
        options={{
          title: "Professional List",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

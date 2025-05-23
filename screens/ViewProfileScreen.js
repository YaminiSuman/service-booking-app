import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { Platform } from "react-native";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import DeleteButton from "../components/ui/DeleteButton";
import {
  getMyUserDetails,
  switchToGenUser,
  deleteMyAccount,
} from "../util/Auth";
import { AuthContext } from "../store/AuthContext";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
  ? "ca-app-pub-2257380265518883/4188240953"
  : "ca-app-pub-2257380265518883/1080179190";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

export default function ViewProfileScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getMyUserDetails(token);
        setUserDetails(userDetails);
      } catch (e) {
        // Handle error
        console.log(e);
      }
    };

    fetchUserDetails();
  }, []);

  const {
    name,
    email,
    cost,
    is_prof_user,
    category,
    area,
    note_text,
    business_logo,
    certificate,
  } = userDetails;

  if (!is_prof_user) {
    return (
      <ScrollView>
        <View style={styles.genUserContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>{i18n.t("Name")}</Text>
            <Text style={[styles.title]}>{name}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>{i18n.t("Email")}</Text>
            <Text style={[styles.title]}>{email}</Text>
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={() =>
                navigation.navigate("EditProfileScreen", {
                  name,
                  email,
                  is_prof_user,
                })
              }
            >
              {i18n.t("Edit Profile")}
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => navigation.navigate("ResetPassword")}>
              {i18n.t("Reset Password")}
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => navigation.navigate("SwitchToProfessional")}>
              {i18n.t("Switch to Professional")}
            </Button>
          </View>
          <View style={styles.buttons}>
            <DeleteButton
              onPress={() =>
                Alert.alert(
                  i18n.t("Delete my account"),
                  i18n.t("Are you sure?"),
                  [
                    {
                      text: i18n.t("Yes, please"),
                      onPress: () => {
                        navigation.navigate("Categories"),
                          deleteMyAccount(authCtx.token).then(authCtx.logout());
                        Toast.show(i18n.t("Your account is deleted"), {
                          duration: Toast.durations.LONG,
                        });
                      },
                    },
                    {
                      text: i18n.t("Cancel"),
                      style: "cancel",
                    },
                  ]
                )
              }
            >
              {i18n.t("Delete my account")}
            </DeleteButton>
          </View>
        </View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </ScrollView>
    );
  } else
    return (
      <View>
        <ScrollView>
          <View style={styles.rootContainer}>
            <View style={styles.column}>
              <Text style={styles.label}>{i18n.t("Name")}</Text>
              <Text style={[styles.title]}>{name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{i18n.t("Email")}</Text>
              <Text style={[styles.title]}>{email}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{i18n.t("Cost")}</Text>
              <Text style={[styles.title]}>Kz {cost}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{i18n.t("Category")}</Text>
              <Text style={[styles.title]}>{category}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{i18n.t("Area")}</Text>
              <Text style={[styles.title]}>{area}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>{i18n.t("Notes")}</Text>
              <Text style={[styles.title]}>
                {note_text ? note_text : i18n.t("None")}
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={styles.column}
                onPress={() => console.log("clicked")}
              >
                <Text style={styles.ImageLabel}>{i18n.t("Business Logo")}</Text>
                <Image
                  source={{ uri: `${business_logo}` }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={styles.column}
                onPress={() => console.log("clicked")}
              >
                <Text style={styles.ImageLabel}>{i18n.t("Certificate")}</Text>
                <Image
                  source={{ uri: `${certificate}` }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.buttons}>
              <Button
                onPress={() =>
                  navigation.navigate("EditProfileScreen", {
                    name,
                    email,
                    cost,
                    area,
                    note_text,
                    is_prof_user,
                    business_logo,
                    certificate,
                  })
                }
              >
                {i18n.t("Edit Profile")}
              </Button>
            </View>
            <View style={styles.buttons}>
              <Button onPress={() => navigation.navigate("ResetPassword")}>
                {i18n.t("Reset Password")}
              </Button>
            </View>
            <View style={styles.buttons}>
              <Button
                onPress={() =>
                  Alert.alert(
                    i18n.t("Switch to General User"),
                    i18n.t("Are you sure?"),
                    [
                      {
                        text: i18n.t("Yes, please"),
                        onPress: () => {
                          navigation.navigate("Categories"),
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
                  )
                }
              >
                {i18n.t("Switch to General User")}
              </Button>
            </View>
            <View style={styles.buttons}>
              <DeleteButton
                onPress={() =>
                  Alert.alert(
                    i18n.t("Delete my account"),
                    i18n.t("Are you sure?"),
                    [
                      {
                        text: i18n.t("Yes, please"),
                        onPress: () => {
                          navigation.navigate("Categories"),
                            deleteMyAccount(authCtx.token).then(
                              authCtx.logout()
                            );
                        },
                      },
                      {
                        text: i18n.t("Cancel"),
                        style: "cancel",
                      },
                    ]
                  )
                }
              >
                {i18n.t("Delete my account")}
              </DeleteButton>
            </View>
          </View>
        </ScrollView>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  genUserContainer: {
    flex: 1,
    marginTop: 60,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "column",
    marginBottom: 2,
  },
  column: {
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#ddd7d7",
    marginBottom: 4,
    // marginRight: 15,
  },
  ImageLabel: {
    fontSize: 14,
    color: "#ddd7d7",
    marginBottom: 5,
    // marginLeft: 110,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
    flex: 1,
    flexWrap: "wrap",
  },
  buttons: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "75%",
    height: 100,
    marginLeft: 40,
    marginBottom: 20,
  },
});

import { StyleSheet, View, TextInput, ScrollView, Alert } from "react-native";
import { useState, useContext, useCallback, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-root-toast";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { dropDownItemsForArea } from "../util/Common";
import ImagePicker from "../components/ui/ImagePicker";
import { patchGeneralUserProfile, patchProfUserProfile } from "../util/Auth";
import { AuthContext } from "../store/AuthContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";

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

export default function EditProfileScreen({ navigation, route }) {
  const isProfUser = route.params.is_prof_user;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [cost, setCost] = useState(route.params.cost);
  const [notes, setNotes] = useState(route.params.note_text);
  const [businessLogo, setBusinessLogo] = useState(route.params.business_logo);
  const [profCertificate, setProfCertificate] = useState(
    route.params.certificate
  );

  const [openAreaDropDown, setOpenAreaDropDown] = useState(false);
  const [areaDropDownValue, setAreaDropDownValue] = useState(route.params.area);
  const [areaDropDownItems, setAreaDropDownItems] = useState([]);

  const onOpenAreaDropDown = useCallback(() => {
    setOpenAreaDropDown(true);
  }, []);

  useEffect(() => {
    const fetchDropDownItems = async () => {
      const area = await dropDownItemsForArea();

      setAreaDropDownItems(area);
    };

    fetchDropDownItems().catch(console.error);
  }, []);

  async function updateGenUserProfile() {
    try {
      setIsUpdating(true);
      const res = await patchGeneralUserProfile(name, email, token);

      if (!!res) {
        Toast.show(i18n.t("User profile updated successfully"), {
          duration: Toast.durations.LONG,
        });
        authCtx.setUserName(name);
        navigation.navigate("Categories");
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Something went wrong"),
        i18n.t("Could not update profile. Please try again later!")
      );
    }
    setIsUpdating(false);
  }
  if (isUpdating) {
    return <LoadingOverlay message={i18n.t("Updating Profile")} />;
  }
  if (!isProfUser) {
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={i18n.t("Name")}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder={i18n.t("Email")}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.buttons}>
            <Button onPress={updateGenUserProfile}>
              {i18n.t("Update Profile")}
            </Button>
          </View>
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
    function handleBusinessLogoUpload(logo) {
      setBusinessLogo(logo);
    }
    function handleProfCertUpload(cert) {
      setProfCertificate(cert);
    }

    async function updateProfUserProfile() {
      try {
        setIsUpdating(true);
        if (!Number.isFinite(Number(cost))) {
          return Alert.alert(i18n.t("Cost should be numeric"));
        }

        const res = await patchProfUserProfile(
          name,
          email,
          cost,
          areaDropDownValue,
          notes,
          businessLogo,
          profCertificate,
          token
        );

        if (!!res) {
          Toast.show(i18n.t("User profile updated successfully"), {
            duration: Toast.durations.LONG,
          });
          authCtx.setUserName(name);
          navigation.navigate("Categories");
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert(
          i18n.t("Something went wrong"),
          i18n.t("Could not update profile. Please try again later!")
        );
      }
      setIsUpdating(false);
    }

    return (
      <View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("Name")}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("Email")}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("Cost")}
              value={cost}
              onChangeText={setCost}
            />

            <DropDownPicker
              placeholder={i18n.t("Select Area")}
              open={openAreaDropDown}
              value={areaDropDownValue}
              items={areaDropDownItems}
              onOpen={onOpenAreaDropDown}
              onClose={() => setOpenAreaDropDown(false)}
              setValue={setAreaDropDownValue}
              setItems={setAreaDropDownItems}
              style={styles.dropDownContainer}
              dropDownDirection="AUTO"
              zIndex={1000}
              zIndexInverse={2000}
              dropDownContainerStyle={{
                backgroundColor: Colors.primary100,
                borderColor: Colors.primary800,
              }}
            />
            <TextInput
              style={styles.input}
              placeholder={i18n.t("Add notes for your customer - if any")}
              multiline={true}
              onChangeText={setNotes}
              value={notes}
            />
            <ImagePicker
              textToShow={i18n.t("Update Business Logo")}
              handleCallback={handleBusinessLogoUpload}
              img={businessLogo}
            />
            <ImagePicker
              textToShow={i18n.t("Update Professional certificate")}
              handleCallback={handleProfCertUpload}
              img={profCertificate}
            />

            <View style={styles.buttons}>
              <Button onPress={updateProfUserProfile}>
                {i18n.t("Update Profile")}
              </Button>
            </View>
          </View>
          {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    marginBottom: 100,
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
  dropDownContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.primary100,
    backgroundColor: Colors.primary100,
    color: "#e4d0ff",
    borderRadius: 6,
    marginBottom: 8,
  },
});

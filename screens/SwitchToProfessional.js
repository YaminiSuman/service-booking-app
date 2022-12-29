import { StyleSheet, View, Alert, TextInput } from "react-native";
import { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import DropDownPicker from "react-native-dropdown-picker";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../i18n/supportedLanguages";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/AuthContext";
import { switchToProfessionalUser } from "../util/Auth";
import {
  dropDownItemsForCounty,
  dropDownItemsForArea,
  dropDownItemsForCategory,
} from "../util/Common";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function SwitchToProfessional() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [cost, setCost] = useState("");
  const [openCountyDropDown, setOpenCountyDropDown] = useState(false);
  const [countyDropDownValue, setCountyDropDownValue] = useState(null);
  const [countyDropDownItems, setCountyDropDownItems] = useState([]);

  const onOpenCountyDropDown = useCallback(() => {
    setOpenCountyDropDown(true);
    setOpenAreaDropDown(false);
    setOpenCategoryDropDown(false);
  }, []);

  const [openAreaDropDown, setOpenAreaDropDown] = useState(false);
  const [areaDropDownValue, setAreaDropDownValue] = useState(null);
  const [areaDropDownItems, setAreaDropDownItems] = useState([]);

  const onOpenAreaDropDown = useCallback(() => {
    setOpenAreaDropDown(true);
    setOpenCountyDropDown(false);
    setOpenCategoryDropDown(false);
  }, []);

  const [openCategoryDropDown, setOpenCategoryDropDown] = useState(false);
  const [categoryDropDownValue, setCategoryDropDownValue] = useState(null);
  const [categoryDropDownItems, setCategoryDropDownItems] = useState([]);

  const onOpenCategoryDropDown = useCallback(() => {
    setOpenAreaDropDown(false);
    setOpenCountyDropDown(false);
    setOpenCategoryDropDown(true);
  }, []);

  useEffect(() => {
    const fetchDropDownItems = async () => {
      const county = await dropDownItemsForCounty();
      const area = await dropDownItemsForArea();
      const category = await dropDownItemsForCategory();

      setCountyDropDownItems(county);
      setAreaDropDownItems(area);
      setCategoryDropDownItems(category);
    };

    fetchDropDownItems().catch(console.error);
  }, [countyDropDownValue, areaDropDownValue, categoryDropDownValue]);

  async function handleSwitchToProfessional() {
    try {
      if (!Number.isFinite(cost)) {
        return Alert.alert(i18n.t("Cost should be numeric"));
      }
      if (
        !(countyDropDownValue && areaDropDownValue && categoryDropDownValue)
      ) {
        return Alert.alert(i18n.t("Please fill all the fields"));
      } else {
        const token = authCtx.token;
        const res = await switchToProfessionalUser(
          true,
          categoryDropDownValue,
          countyDropDownValue,
          areaDropDownValue,
          cost,
          token
        );

        if (!!res) {
          authCtx.setProfUser(true);
          Toast.show(i18n.t("Switched to professional account successfully"), {
            duration: Toast.durations.LONG,
          });
          navigation.navigate("Categories");
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Something went wrong"),
        i18n.t("Could not switch to professional. Please try again later!")
      );
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("Enter your cost per hour")}
        value={cost}
        onChangeText={setCost}
        keyboardType="number-pad"
      />
      <DropDownPicker
        placeholder={i18n.t("Select County")}
        open={openCountyDropDown}
        value={countyDropDownValue}
        items={countyDropDownItems}
        onOpen={onOpenCountyDropDown}
        onClose={() => setOpenCountyDropDown(false)}
        setValue={setCountyDropDownValue}
        setItems={setCountyDropDownItems}
        style={styles.dropDownContainer}
        dropDownDirection="AUTO"
        zIndex={3000}
        zIndexInverse={1000}
        dropDownContainerStyle={{
          backgroundColor: Colors.primary100,
          borderColor: Colors.primary800,
        }}
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
        zIndex={2000}
        zIndexInverse={2000}
        dropDownContainerStyle={{
          backgroundColor: Colors.primary100,
          borderColor: Colors.primary800,
        }}
      />
      <DropDownPicker
        placeholder={i18n.t("Select Category")}
        open={openCategoryDropDown}
        value={categoryDropDownValue}
        items={categoryDropDownItems}
        onOpen={onOpenCategoryDropDown}
        onClose={() => setOpenCategoryDropDown(false)}
        setValue={setCategoryDropDownValue}
        setItems={setCategoryDropDownItems}
        style={styles.dropDownContainer}
        dropDownDirection="AUTO"
        zIndex={1000}
        zIndexInverse={3000}
        dropDownContainerStyle={{
          backgroundColor: Colors.primary100,
          borderColor: Colors.primary800,
        }}
      />

      <View style={styles.buttons}>
        <Button onPress={handleSwitchToProfessional}>
          {i18n.t("SWITCH_TO_PROF_USER")}
        </Button>
      </View>
    </View>
  );
}

export default SwitchToProfessional;

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

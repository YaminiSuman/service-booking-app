import { StyleSheet, View, Modal, Text, Alert } from "react-native";
import { useState, useCallback, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import {
  dropDownItemsForXDays,
  startTimeSlots,
  endTimeSlots,
} from "../../util/Common";
import { displayAvailableServiceWorkers } from "../../util/Auth";
import { Colors } from "../../constants/styles";
import Button from "./Button";
import FlatButton from "./FlatButton";
import { AuthContext } from "../../store/AuthContext";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function ServiceInputModal(props) {
  const navigation = useNavigation();

  const [openDateDropDown, setOpenDateDropDown] = useState(false);
  const [dateDropDownValue, setDateDropDownValue] = useState(null);
  const [dateDropDownItems, setDateDropDownItems] = useState(
    dropDownItemsForXDays()
  );

  const [openStartTimeDropDown, setOpenStartTimeDropDown] = useState(false);
  const [startTimeDropDownValue, setStartTimeDropDownValue] = useState(null);
  const [startTimeDropDownItems, setStartTimeDropDownItems] = useState(
    startTimeSlots()
  );

  const [openEndTimeDropDown, setOpenEndTimeDropDown] = useState(false);
  const [endTimeDropDownValue, setEndTimeDropDownValue] = useState(null);
  const [endTimeDropDownItems, setEndTimeDropDownItems] = useState(
    endTimeSlots()
  );

  const onOpenDateDropDown = useCallback(() => {
    setOpenDateDropDown(true);
    setOpenStartTimeDropDown(false);
    setOpenEndTimeDropDown(false);
  }, []);

  const onOpenStartTimeDropdown = useCallback(() => {
    setOpenDateDropDown(false);
    setOpenStartTimeDropDown(true);
    setOpenEndTimeDropDown(false);
  }, []);

  const onOpenEndTimeDropdown = useCallback(() => {
    setOpenDateDropDown(false);
    setOpenStartTimeDropDown(false);
    setOpenEndTimeDropDown(true);
  }, []);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  async function handleGetDetails() {
    try {
      if (
        !(dateDropDownValue && startTimeDropDownValue && endTimeDropDownValue)
      ) {
        Alert.alert(
          i18n.t("Required Field !!!"),
          i18n.t("You need to fill in all the values to get details")
        );
      } else {
        const workerDetails = await displayAvailableServiceWorkers(
          props.id,
          dateDropDownValue,
          startTimeDropDownValue,
          endTimeDropDownValue,
          token
        );
        console.log("workerDetails", workerDetails);
        if (workerDetails.status == "406") {
          Alert.alert(i18n.t("End time should be later than start time"));
        } else {
          props.onCancel();
          navigation.navigate("ProfessionalList", {
            workerDetails: workerDetails,
            category: props.category,
            selectedDate: dateDropDownValue,
            selectedStartTime: startTimeDropDownValue,
            selectedEndTime: endTimeDropDownValue,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        i18n.t("Something went wrong"),
        i18n.t("Could not get details. Please try again later!")
      );
    }
  }

  return (
    <>
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.inputContainer}>
            <Text style={styles.instructionText}>
              {i18n.t("Please choose your preference")}
            </Text>
            <DropDownPicker
              placeholder={i18n.t("Select day")}
              open={openDateDropDown}
              value={dateDropDownValue}
              items={dateDropDownItems}
              onOpen={onOpenDateDropDown}
              onClose={() => setOpenDateDropDown(false)}
              setValue={setDateDropDownValue}
              setItems={setDateDropDownItems}
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
              placeholder={i18n.t("Select start time")}
              open={openStartTimeDropDown}
              value={startTimeDropDownValue}
              items={startTimeDropDownItems}
              onOpen={onOpenStartTimeDropdown}
              onClose={() => setOpenStartTimeDropDown(false)}
              setValue={setStartTimeDropDownValue}
              setItems={setStartTimeDropDownItems}
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
              placeholder={i18n.t("Select end time")}
              open={openEndTimeDropDown}
              value={endTimeDropDownValue}
              items={endTimeDropDownItems}
              onOpen={onOpenEndTimeDropdown}
              onClose={() => setOpenEndTimeDropDown(false)}
              setValue={setEndTimeDropDownValue}
              setItems={setEndTimeDropDownItems}
              style={styles.dropDownContainer}
              dropDownDirection="AUTO"
              zIndex={1000}
              zIndexInverse={3000}
              dropDownContainerStyle={{
                backgroundColor: Colors.primary100,
                borderColor: Colors.primary800,
              }}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button onPress={handleGetDetails}>
                  {i18n.t("Get Available Professionals")}
                </Button>
              </View>
              <View style={styles.button}>
                <FlatButton onPress={props.onCancel}>
                  {i18n.t("Cancel")}
                </FlatButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default ServiceInputModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  inputContainer: {
    marginTop: 150,
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
  instructionText: {
    fontSize: 20,
    marginVertical: 17,
    fontWeight: "bold",
    color: "white",
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
  buttonContainer: {
    marginVertical: 16,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 10,
    //width: "30%",
  },
});

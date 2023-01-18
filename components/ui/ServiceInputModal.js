import {
  StyleSheet,
  View,
  Modal,
  Text,
  Alert,
  TouchableOpacity,
  Input,
} from "react-native";
import { useState, useCallback, useContext, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-modal-datetime-picker";

import { I18n } from "i18n-js";
import { translations, defaultLocale } from "../../i18n/supportedLanguages";

import {
  startTimeSlots,
  endTimeSlots,
  getNextDate,
  getThreeMonthFromToday,
  formatDate,
} from "../../util/Common";
import { displayAvailableServiceWorkers } from "../../util/Auth";
import { Colors } from "../../constants/styles";
import Button from "./Button";
import FlatButton from "./FlatButton";
import { AuthContext } from "../../store/AuthContext";
import { dropDownItemsForArea } from "../../util/Common";

const i18n = new I18n(translations);
i18n.locale = defaultLocale;

function ServiceInputModal(props) {
  const navigation = useNavigation();

  const currentDate = new Date(getNextDate());
  const formattedInitialDate = formatDate(currentDate);
  const [datePickerValue, setDay] = useState(formattedInitialDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = formatDate(date);
    setDay(formattedDate);
    hideDatePicker();
  };

  const [openAreaDropDown, setOpenAreaDropDown] = useState(false);
  const [areaDropDownValue, setAreaDropDownValue] = useState(null);
  const [areaDropDownItems, setAreaDropDownItems] = useState([]);

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

  const onOpenAreaDropDown = useCallback(() => {
    setOpenAreaDropDown(true);
    setOpenStartTimeDropDown(false);
    setOpenEndTimeDropDown(false);
  }, []);

  const onOpenStartTimeDropdown = useCallback(() => {
    setOpenAreaDropDown(false);
    setOpenStartTimeDropDown(true);
    setOpenEndTimeDropDown(false);
  }, []);

  const onOpenEndTimeDropdown = useCallback(() => {
    setOpenAreaDropDown(false);
    setOpenStartTimeDropDown(false);
    setOpenEndTimeDropDown(true);
  }, []);

  useEffect(() => {
    const fetchDropDownItems = async () => {
      const area = await dropDownItemsForArea();
      setAreaDropDownItems(area);
      setAreaDropDownValue(area[0].value);
    };

    fetchDropDownItems().catch(console.error);
  }, []);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const maxDayForDatePicker = new Date(getThreeMonthFromToday());
  console.log("maxDayForDatePicker", maxDayForDatePicker);
  async function handleGetDetails() {
    try {
      if (
        !(datePickerValue && startTimeDropDownValue && endTimeDropDownValue)
      ) {
        Alert.alert(
          i18n.t("Required Field !!!"),
          i18n.t("You need to fill in all the values to get details")
        );
      } else {
        const workerDetails = await displayAvailableServiceWorkers(
          props.id,
          datePickerValue,
          startTimeDropDownValue,
          endTimeDropDownValue,
          areaDropDownValue,
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
            selectedDate: datePickerValue,
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
            <TouchableOpacity
              activeOpaticy={1}
              onPress={() => setDatePickerVisibility(true)}
            >
              <View
                style={styles.column}
                onPress={() => console.log("clicked")}
              >
                <Text style={styles.datePickerText}>{datePickerValue}</Text>
                <DateTimePicker
                  style={{
                    width: "100%",
                    padding: 10,
                    backgroundColor: Colors.primary100,
                    borderColor: Colors.primary800,
                    marginBottom: 10,
                    borderRadius: 4,
                    color: "black",
                  }}
                  isVisible={isDatePickerVisible}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={currentDate}
                  maximumDate={maxDayForDatePicker}
                  mode={"date"}
                  customStyles={{
                    datePickerCon: {
                      borderColor: Colors.primary100,
                      backgroundColor: Colors.primary800,
                    },
                    dateInput: {
                      position: "absolute",
                      left: 17,
                      top: 0,
                      borderColor: Colors.primary100,
                      borderRadius: 4,
                      color: "black",
                    },
                    dateText: {
                      color: "black",
                      fontSize: 14,
                      right: 10,
                    },
                    placeholderText: {
                      right: 10,
                      color: "black",
                      fontSize: 14,
                    },
                  }}
                />
              </View>
            </TouchableOpacity>

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
  datePickerText: {
    fontSize: 16,
    color: "black",
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
  column: {
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.primary100,
    backgroundColor: Colors.primary100,
    color: "#e4d0ff",
    borderRadius: 6,
    marginBottom: 8,
  },
});

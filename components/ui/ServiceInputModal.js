import { StyleSheet, View, Button, Modal, Image, Alert } from "react-native";
import { useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  dropDownItemsForXDays,
  startTimeSlots,
  endTimeSlots,
} from "../../util/Common";
import { displayAvailableServiceWorkers } from "../../util/Auth";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";

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

  async function handleGetDetails() {
    try {
      if (!(dateDropDownValue && startTimeDropDownValue && endTimeDropDownValue))
       {
        Alert.alert(
          "Required Field !!!",
          "You need to fill in all the values to get details"
        );
      } else {
        const workerDetails = await displayAvailableServiceWorkers(
          props.id,
          dateDropDownValue,
          startTimeDropDownValue,
          endTimeDropDownValue
        );
        navigation.navigate("ProfessionalList", {
          workerDetails: workerDetails,
          selectedDate: dateDropDownValue,
          selectedStartTime: startTimeDropDownValue,
          selectedEndTime: endTimeDropDownValue,
        });
      }
    } catch (error) {
      Alert.alert(
        "Something went wrong",
        "Could not get details. Please try again later!"
      );
    }

     props.onCancel();
  }

  return (
    <>
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/randomIcon.png")}
          />
          <DropDownPicker
            placeholder="Select preferred day"
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
              backgroundColor: "#e4d0ff",
              marginLeft: 18,
              width: "90%",
            }}
          />

          <DropDownPicker
            placeholder="Select preferred start time"
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
              backgroundColor: "#e4d0ff",
              marginLeft: 18,
              width: "90%",
            }}
          />
          <DropDownPicker
            placeholder="Select preferred end time"
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
              backgroundColor: "#e4d0ff",
              marginLeft: 18,
              width: "90%",
            }}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Get Details"
                onPress={handleGetDetails}
                color="#b180f0"
              />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default ServiceInputModal;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  dropDownContainer: {
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    marginBottom: 8,
    marginLeft: 18,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
  },
});

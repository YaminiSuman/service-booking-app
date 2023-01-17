import dayjs from "dayjs";
import {
  getDropDownValuesForProfAccountSwitching,
  getCategories,
  getAllArea,
} from "./Auth";

const nextXDays = (n = 15) => {
  let days = [];
  for (let i = 1; i <= n; i++) {
    const newDate = dayjs().add(i, "day");
    days.push(newDate);
  }

  return days;
};

export const getNextDate = () => {
  return dayjs().add(1, "day").format("DD-MM-YYYY");
};

export const getThreeMonthFromToday = () => {
  return dayjs().add(1, "year").format("DD-MM-YYYY");
};
export const dropDownItemsForXDays = () => {
  let dropDownValue = nextXDays();
  let dropDownArr = [];

  for (let i = 0; i < dropDownValue.length; i++) {
    dropDownArr.push({
      label: dayjs(dropDownValue[i]).format("DD-MMM-YYYY"),
      value: dropDownValue[i].format("DD-MM-YYYY"),
    });
  }
  return dropDownArr;
};

export const startTimeSlots = () => {
  return [
    { label: "8:00AM", value: "8:00" },
    { label: "8:30AM ", value: "9:00" },
    { label: "9:00AM", value: "9:00" },
    { label: "9:30AM ", value: "9:30" },
    { label: "10:00AM ", value: "10:00" },
    { label: "10:30AM ", value: "10:30" },
    { label: "11:00AM ", value: "11:00" },
    { label: "11:30AM ", value: "11:30" },
    { label: "12:00PM", value: "12:00" },
    { label: "12:30PM ", value: "12:30" },
    { label: "1:00PM ", value: "13:00" },
    { label: "1:30PM", value: "13:30" },
    { label: "2:00PM ", value: "14:00" },
    { label: "2:30PM ", value: "14:30" },
    { label: "3:00PM ", value: "15:00" },
    { label: "3:30PM ", value: "15:30" },
    { label: "4:00PM ", value: "16:00" },
    { label: "4:30PM", value: "16:30" },
    { label: "5:00PM ", value: "17:00" },
    { label: "5:30PM", value: "17:30" },
    { label: "6:00PM", value: "18:00" },
  ];
};

export const endTimeSlots = () => {
  return [
    { label: "8:30AM ", value: "9:00" },
    { label: "9:30AM ", value: "9:30" },
    { label: "10:00AM ", value: "10:00" },
    { label: "10:30AM ", value: "10:30" },
    { label: "11:00AM ", value: "11:00" },
    { label: "11:30AM ", value: "11:30" },
    { label: "12:00PM", value: "12:00" },
    { label: "12:30PM ", value: "12:30" },
    { label: "1:00PM ", value: "13:00" },
    { label: "1:30PM", value: "13:30" },
    { label: "2:00PM ", value: "14:00" },
    { label: "2:30PM ", value: "14:30" },
    { label: "3:00PM ", value: "15:00" },
    { label: "3:30PM ", value: "15:30" },
    { label: "4:00PM ", value: "16:00" },
    { label: "4:30PM", value: "16:30" },
    { label: "5:00PM ", value: "17:00" },
    { label: "5:30PM", value: "17:30" },
    { label: "6:00PM", value: "18:00" },
    { label: "6:30PM", value: "18:30" },
  ];
};

export async function dropDownItemsForCounty() {
  try {
    const data = await getDropDownValuesForProfAccountSwitching();
    let dropDownValue = data.county;
    let dropDownArr = [];

    for (let i = 0; i < dropDownValue.length; i++) {
      dropDownArr.push({
        label: dropDownValue[i],
        value: dropDownValue[i],
      });
    }

    return dropDownArr;
  } catch (error) {
    console.log(error.message);
  }
}

export async function dropDownItemsForArea() {
  try {
    const data = await getAllArea();
    let dropDownValue = data;
    let dropDownArr = [];

    for (let i = 0; i < dropDownValue.length; i++) {
      dropDownArr.push({
        label: dropDownValue[i],
        value: dropDownValue[i],
      });
    }

    return dropDownArr;
  } catch (error) {
    console.log(error.message);
  }
}

export async function dropDownItemsForCategory() {
  try {
    const data = await getCategories();
    let dropDownValue = data;
    let dropDownArr = [];

    for (let i = 0; i < dropDownValue.length; i++) {
      dropDownArr.push({
        label: dropDownValue[i].name,
        value: dropDownValue[i].id,
      });
    }

    return dropDownArr;
  } catch (error) {
    console.log(error.message);
  }
}

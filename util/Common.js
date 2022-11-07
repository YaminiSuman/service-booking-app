import dayjs from "dayjs";

const nextXDays = (n = 15) => {
  let days = [];
  for (let i = 1; i <= n; i++) {
    const newDate = dayjs().add(i, "day");
    days.push(newDate);
  }

  return days;
};

export const dropDownItemsForXDays = () => {
  let dropDownValue = nextXDays();
  
  let dropDownArr = [];

  for (let i = 0; i < dropDownValue.length; i++) {
    dropDownArr.push({
      label: dayjs(dropDownValue[i]).format("DD-MMM-YYYY"),
      value: dropDownValue[i].format("YYYY-MM-DD"),
    });
  }
  return dropDownArr;
};

export const startTimeSlots = () => {
  return [
    { label: "9:00AM", value: "9:00AM" },
    { label: "9:30AM ", value: "9:30AM" },
    { label: "10:00AM ", value: "10:00AM" },
    { label: "10:30AM ", value: "10:30AM" },
    { label: "11:00AM ", value: "11:00AM" },
    { label: "11:30AM ", value: "11:30AM" },
    { label: "12:00PM", value: "12:00PM" },
    { label: "12:30PM ", value: "12:30PM" },
    { label: "1:00PM ", value: "1:00PM" },
    { label: "1:30PM", value: "1:30PM" },
    { label: "2:00PM ", value: "2:00PM" },
    { label: "2:30PM ", value: "2:30PM" },
    { label: "3:00PM ", value: "3:00PM" },
    { label: "3:30PM ", value: "3:30PM" },
    { label: "4:00PM ", value: "4:00PM" },
    { label: "4:30P", value: "4:30PM" },
    { label: "5:00PM ", value: "5:00PM" },
    { label: "5:30PM", value: "5:30PM" },
    { label: "6:00PM", value: "6:00PM" },
  ];
};

export const endTimeSlots = () => {
  return [
    { label: "9:30AM ", value: "9:30AM" },
    { label: "10:00AM ", value: "10:00AM" },
    { label: "10:30AM ", value: "10:30AM" },
    { label: "11:00AM ", value: "11:00AM" },
    { label: "11:30AM ", value: "11:30AM" },
    { label: "12:00PM", value: "12:00PM" },
    { label: "12:30PM ", value: "12:30PM" },
    { label: "1:00PM ", value: "1:00PM" },
    { label: "1:30PM", value: "1:30PM" },
    { label: "2:00PM ", value: "2:00PM" },
    { label: "2:30PM ", value: "2:30PM" },
    { label: "3:00PM ", value: "3:00PM" },
    { label: "3:30PM ", value: "3:30PM" },
    { label: "4:00PM ", value: "4:00PM" },
    { label: "4:30P", value: "4:30PM" },
    { label: "5:00PM ", value: "5:00PM" },
    { label: "5:30PM", value: "5:30PM" },
    { label: "6:00PM", value: "6:00PM" },
    { label: "6:30PM", value: "6:30PM" },
  ];
};

import axios from "axios";

// const Base_URL = "http://10.10.165.37:8000/api";
const Base_URL = "http://10.10.165.62:8081/api";

export function createUser(email, password, name) {
  let userData = JSON.stringify({
    email: email,
    password: password,
    name: name,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios
    .post(`${Base_URL}/user/create/`, userData, axiosConfig)
    .then((res) => {
      console.log("**Signup RESPONSE RECEIVED: ", res);
      return res.data.token;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function loginUser(email, password) {
  let userData = JSON.stringify({
    email: email,
    password: password,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${Base_URL}/user/login/`, userData, axiosConfig)
    .then((res) => {
      console.log("**Login RESPONSE RECEIVED: ", res.data.token);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function getCategories() {
  const { data } = await axios.get(`${Base_URL}/profession/allType/`);
  return data;
}

export async function displayAvailableServiceWorkers(
  id,
  day,
  startTime,
  endTime
) {
  const start_time = `${day} ${startTime}`;
  const end_time = `${day} ${endTime}`;

  let userData = JSON.stringify({
    profession_type_id: id,
    start_time: start_time,
    end_time: end_time,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${Base_URL}/profession/availableOfType/`, userData, axiosConfig)
    .then((res) => {
      console.log("**Available Professional Service RECEIVED: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function confirmBookingRequest(id, startTime, endTime, token) {
  const gen_user = 1;
  let userData = JSON.stringify({
    general_user: gen_user,
    profession: id,
    start_at: startTime,
    end_at: endTime,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/booking/byMe/`, userData, axiosConfig)
    .then((res) => {
      console.log("Booking RESPONSE RECEIVED: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}


export async function getMyBookings(token) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${token}`,
      },
    };
  const { data } = await axios.get(`${Base_URL}/booking/byMe/`, axiosConfig);
  console.log("Booking List Response: ", data);
  return data;
}

export async function updateUserPassword(password, token) {
  
  let userData = JSON.stringify({
    password: password,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .patch(`${Base_URL}/user/me/`, userData, axiosConfig)
    .then((res) => {
      console.log("Password Reset Successful: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err);
    });
}

export async function switchToProfessionalUser(is_prof_user, token) {
  let userData = JSON.stringify({
    is_prof_user: true,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .patch(`${Base_URL}/user/me/`, userData, axiosConfig)
    .then((res) => {
      console.log("User switched to professional account ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err);
    });
}

export async function getProfUserBookings(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  const { data } = await axios.get(`${Base_URL}/booking/forMe/`, axiosConfig);
  console.log("Booking for me Response: ", data);
  return data;
}
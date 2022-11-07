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
      return res.data.token;
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

  let userData = JSON.stringify({
    profession_type_id: id,
    date: day,
    start_time: startTime,
    end_time: endTime,
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
      console.log("**Service RESPONSE RECEIVED: ", res.data);
      return res.data;
    })
    .catch((err) => {
      
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

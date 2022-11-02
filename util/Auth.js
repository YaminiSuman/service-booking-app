import axios from "axios";

const Base_URL = "http://10.10.165.37:8000/api";
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
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export function loginUser(email, password) {
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
  axios
    .post(`${Base_URL}/user/login/`, userData, axiosConfig)
    .then((res) => {
      console.log("**Login RESPONSE RECEIVED: ", res.data.token);
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}
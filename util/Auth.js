import axios from "axios";

export const Base_URL = "https://kul.pythonanywhere.com/api";
//export const Base_URL = "http://10.10.165.37:8081/api";

export async function createUser(email, password, name) {
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
  return axios
    .post(`${Base_URL}/user/create/`, userData, axiosConfig)
    .then((res) => {
      console.log("**Signup RESPONSE RECEIVED: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function loginUser(email, password, fcmToken) {
  let userData = JSON.stringify({
    email: email,
    password: password,
    fcm_token: fcmToken,
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
      console.log("**Login RESPONSE RECEIVED: ", res.data);
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

export async function getAllArea() {
  const { data } = await axios.get(`${Base_URL}/profession/allArea/`);
  return data;
}

export async function displayAvailableServiceWorkers(
  id,
  day,
  startTime,
  endTime,
  areaDropDownValue,
  token = null
) {
  const start_time = `${day} ${startTime}`;
  const end_time = `${day} ${endTime}`;

  let userData = JSON.stringify({
    profession_type_id: id,
    start_time: start_time,
    end_time: end_time,
    area: areaDropDownValue,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
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
      return err.response;
    });
}

export async function confirmBookingRequest(
  currentUserId,
  id,
  startTime,
  endTime,
  token
) {
  let userData = JSON.stringify({
    general_user: currentUserId,
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
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

const createFormData = (businessLogo, profCertificate, userData) => {
  const data = new FormData();

  let businessURI = businessLogo;
  let businessLogofilename = businessURI.split("/").pop();

  let ProfCertURI = profCertificate;
  let profCertFilename = ProfCertURI.split("/").pop();

  let match = /\.(\w+)$/.exec(businessLogofilename);
  let type = match ? `image/${match[1]}` : `image`;

  let match2 = /\.(\w+)$/.exec(profCertFilename);

  let typeCert = match ? `image/${match2[1]}` : `image`;

  data.append("business_logo", {
    uri:
      Platform.OS === "android"
        ? businessURI
        : businessURI.replace("file://", ""),
    name: businessLogofilename,
    type,
  });

  data.append("certificate", {
    uri:
      Platform.OS === "android"
        ? profCertificate
        : profCertificate.replace("file://", ""),
    name: profCertFilename,
    type: typeCert,
  });

  Object.keys(userData).forEach((key) => {
    data.append(key, userData[key]);
  });

  return data;
};

export async function switchToProfessionalUser(
  userId,
  is_prof_user,
  prof_id,
  area,
  cost,
  businessLogo,
  profCertificate,
  notes,
  token
) {
  let userData = {
    user: userId,
    is_prof_user: is_prof_user,
    profession_type: prof_id,
    area: area,
    cost: cost,
    note_text: notes,
  };
  const formData = createFormData(businessLogo, profCertificate, userData);
  console.log("formData", JSON.stringify(formData));
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/profession/mine/`, formData, axiosConfig)
    .then((res) => {
      console.log("User switched to professional account ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
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

export async function getDropDownValuesForProfAccountSwitching() {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const { data } = await axios.get(
    `${Base_URL}/profession/professionalUserOptions/`,
    axiosConfig
  );
  console.log("Dropdown value response: ", data);
  return data;
}

export async function logout(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/user/logout/`, {}, axiosConfig)
    .then((res) => {
      console.log("Logout Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function switchToGenUser(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };

  return axios
    .delete(`${Base_URL}/profession/switch_to_gen_user/`, axiosConfig)
    .then((res) => {
      console.log("Switch to Gen User Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function deleteMyAccount(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };

  return axios
    .delete(`${Base_URL}/user/delete/`, axiosConfig)
    .then((res) => {
      console.log("Delete account response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function patchBookingStatus(status, token, id, byMeOrForMe) {
  let data = JSON.stringify({
    status: status,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .patch(`${Base_URL}/booking/${byMeOrForMe}/${id}/`, data, axiosConfig)
    .then((res) => {
      console.log("Booking Patch Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function getMyReviews(profId) {
  let data = JSON.stringify({
    professional_id: profId,
  });
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${Base_URL}/profession/get_all_reviews/`, data, axiosConfig)
    .then((res) => {
      console.log("Review Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function submitBookingReview(bookingId, review, token) {
  let data = JSON.stringify({
    booking_id: bookingId,
    review: review,
  });
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/booking/post_booking_review/`, data, axiosConfig)
    .then((res) => {
      console.log("Submit review Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function getMyUserDetails(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  const { data } = await axios.get(`${Base_URL}/user/update-me/`, axiosConfig);
  console.log("User profile data response: ", data);
  return data;
}

export async function patchGeneralUserProfile(name, email, token) {
  let data = JSON.stringify({
    name: name,
    email: email,
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .patch(`${Base_URL}/user/update-me/`, data, axiosConfig)
    .then((res) => {
      console.log("User profile update response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function patchProfUserProfile(
  name,
  email,
  cost,
  areaDropDownValue,
  notes,
  businessLogo,
  profCertificate,
  token
) {
  let userData = {
    name: name,
    email: email,
    cost: cost,
    area: areaDropDownValue,
    note_text: notes,
  };

  const formData = createFormData(businessLogo, profCertificate, userData);

  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };

  return axios
    .patch(`${Base_URL}/user/update-me/`, formData, axiosConfig)
    .then((res) => {
      console.log("User profile update response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function getMyMessages(profId, token) {
  let data = JSON.stringify({
    other_user: profId,
  });
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/chat/all/`, data, axiosConfig)
    .then((res) => {
      console.log("Message Response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function postMyMessage(otherUserId, message, token) {
  let data = JSON.stringify({
    receiver: otherUserId,
    message: message,
  });
  console.log("receiver id ", otherUserId);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  return axios
    .post(`${Base_URL}/chat/`, data, axiosConfig)
    .then((res) => {
      console.log("Post message response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
    });
}

export async function getAllChats(token) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token}`,
    },
  };
  const { data } = await axios.get(
    `${Base_URL}/chat/get_chat_list/`,
    axiosConfig
  );
  console.log("Chat list Response: ", data);
  return data;
}

// get subcategory for given category

export async function getSubCategoryForCategory(id) {
  let userData = JSON.stringify({
    parent_profession_id: id,
  });

  console.log("req object for sub category", userData);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(
      `${Base_URL}/profession/fetchSubCategories/`,
      userData,
      axiosConfig
    )
    .then((res) => {
      console.log("**Subcategory response: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("**AXIOS ERROR: ", err.response.data);
      return err.response;
    });
}

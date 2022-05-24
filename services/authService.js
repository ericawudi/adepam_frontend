/* eslint-disable quotes */
import axios from "axios";
import { Constants } from "./constants";

const APIAxios = axios.create({
  //   baseURL: Constants.App.BASE_API_URL,
  //   baseURL: "http:localhost:3001/",
});

// Create user account
export const CreateUser = async (data, path) => {
  const resp = await APIAxios.post(`/${path}`, data)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// export const CreateUser = async (data, path) => {
//   axios.defaults.baseURL = "http:localhost:3001/";
//   const resp = await axios
//     .post(`${path}`, data)
//     .then((resp) => resp)
//     .catch((err) => err.response);
//   return resp;
// };

// // Example POST method implementation:
// export const CreateUser = async (path = "", data = {}) => {
//   const url = `https:localhost:3001/student`;
//   //   console.log(url);
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     // body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// };

// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

// Get List of All students
export const GetStudentList = async () => {
  const resp = await APIAxios.get()
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Change user input
export const AddNewStudent = async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const resp = await APIAxios.post("/", data, axiosConfig)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Change user input
export const EditStudent = async (data) => {
  const resp = await APIAxios.put("/", data)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Change user input
export const DeleteStudent = async (id) => {
  let auth = cookies.get(Constants.App.PRIVILEGE);
  let data = {
    auth: auth[0].privilege,
    id: id,
  };
  const resp = await APIAxios.delete("/", {
    data: data,
  })
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

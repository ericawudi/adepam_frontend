/* eslint-disable quotes */
import axios from "axios";
import { Constants } from "./constants";

const APIAxios = axios.create({
  baseURL: Constants.App.BASE_API_URL,
});

// Get List of All students
export const GetList = async (route) => {
  const resp = await APIAxios.get(route)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Get List of All students
export const GetStudentList = async () => {
  const resp = await APIAxios.get()
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Get List of All students
export const GetTeacherList = async () => {
  const resp = await APIAxios.get()
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Get List of All students
export const GetMachineList = async () => {
  const resp = await APIAxios.get()
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Create user account
export const CreateUser = async (data, path) => {
  const resp = await APIAxios.post(`/${path}`, data)
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
export const EditDetails = async (route, data) => {
  const resp = await APIAxios.put(route, data)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

// Change user input
export const DeleteRecord = async (route, id) => {
  const resp = await APIAxios.delete(`${route}/${id}`)
    .then((resp) => resp)
    .catch((err) => err.response);
  return resp;
};

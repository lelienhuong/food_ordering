import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

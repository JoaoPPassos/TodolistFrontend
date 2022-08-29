import axios from "axios";
import { getToken } from "../store/auth";

const url = "http://127.0.0.1:3333";

export const apiAuth = axios.create({
  baseURL: url + "/user/",
});

export const apiTodo = axios.create({
  baseURL: url + "/todo/",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

export const apiCategory = axios.create({
  baseURL: url + "/categories/",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

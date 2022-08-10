import axios from "axios";
import { getToken } from "../store/auth";

const url = "http://127.0.0.1:8000";

export const apiAuth = axios.create({
  baseURL: url + "/auth/",
});

export const apiTodo = axios.create({
  baseURL: url + "/todo/",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

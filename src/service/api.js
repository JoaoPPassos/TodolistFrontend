import axios from "axios";
import { getToken } from "../store/auth";

const url = "https://api.joaopassos.net/todolist";

export const apiAuth = axios.create({
  baseURL: url + "/user/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const apiTodo = axios.create({
  baseURL: url + "/todo/",
  headers: {
    Authorization: "Bearer " + getToken(),
    "Access-Control-Allow-Origin": "*",
  },
});

export const apiCategory = axios.create({
  baseURL: url + "/categories/",
  headers: {
    Authorization: "Bearer " + getToken(),
    "Access-Control-Allow-Origin": "*",
  },
});

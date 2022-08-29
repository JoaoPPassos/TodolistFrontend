import axios from "axios";
import { getToken } from "../store/auth";

const url = "https://todolist-adonis-blugld8ao-joaoppassos.vercel.app";

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

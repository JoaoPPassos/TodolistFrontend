import axios from "axios";
import { getToken } from "../store/auth";

const url = "http://ec2-18-231-26-133.sa-east-1.compute.amazonaws.com";

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

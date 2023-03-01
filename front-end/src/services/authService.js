import jwtDecode from "jwt-decode";
import http from "./httpService";
import { endpoint } from "../config.js";

http.setJwt(getJwt());

const loginEndPoint = `${endpoint}/auth/login`;

export async function login(email, password) {
  const { data: jwt } = await http.post(loginEndPoint, {
    email,
    password,
  });
  sessionStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem("token", jwt);
}

export function logout() {
  sessionStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return sessionStorage.getItem("token");
}

const authService = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default authService;

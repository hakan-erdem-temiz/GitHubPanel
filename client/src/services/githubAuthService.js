import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/github/gitPanelAuth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function connect() {
  const { data: jwt } = await http.get(
    "https://github.com/login/oauth/authorize?scope=user:TestUser001info&client_id=1acd98284d275423d24b"
  );
  console.log("jwt:::");
  console.log(jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  connect,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};

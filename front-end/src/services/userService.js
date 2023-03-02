import http from "./httpService";
import { endpoint } from "../config.js";
import authService from "./authService";

export async function register(user) {
  try {
    const { data: jwt } = await http.post(`${endpoint}/users`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    authService.loginWithJwt(jwt);
    return true;
  } catch (error) {
    throw error;
  }
}

const userService = {
  register,
};

export { userService };

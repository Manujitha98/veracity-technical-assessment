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

export async function getMyProfile() {
  try {
    const { data } = await http.get(`${endpoint}/users/me`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToWishList(movieId) {
  try {
    const { data } = await http.post(`${endpoint}/wish-list-items/`, {
      movieId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromWishList(movieList) {
  try {
    const { data } = await http.delete(`${endpoint}/wish-list-items/`, {
      data: { movieList },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

const userService = {
  register,
  getMyProfile,
  addToWishList,
  removeFromWishList,
};

export { userService };

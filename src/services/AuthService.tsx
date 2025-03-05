import { UserProfileToken } from "../types/User";
import { handleError } from "../helpers/ErrorHandler";
import axios from "axios";

const api = "https://dev-fit-hub-apiv2.onrender.com";

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      api + "/register",
      {
        email: email,
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(
      api + "/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const logoutAPI = async () => {
  try {
    await axios.post(
      api + "/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    handleError(error);
  }
};

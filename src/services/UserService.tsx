import { UserProfile } from "../types/User";
import { handleError } from "../helpers/ErrorHandler";
import axios from "axios";

const api = "http://localhost:3000";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get<UserProfile[]>(`${api}/getAllUsers`, {
      headers: {
        Authorization: `${token}`
      }, withCredentials: true
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

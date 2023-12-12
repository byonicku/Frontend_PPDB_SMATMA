import useAxios from "./APIConstant";
import { getToken } from "./UserHandler";

const login = async (data) => {
  try {
    const response = await useAxios.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const register = async (data) => {
  try {
    const response = await useAxios.post("/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = async () => {
  try {
    const response = await useAxios.post("/logout", {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const APIAuth = {
  login,
  register,
  logout,
};

export default APIAuth;

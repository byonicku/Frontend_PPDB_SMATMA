import useAxios from "./APIConstant";
import getUser, { getToken } from "./UserHandler";

const getUserByID = async (id) => {
  try {
    const response = await useAxios.get(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const submitBerkas = async (data) => {
  const id = JSON.parse(getUser()).data.id_user;
  try {
    const response = await useAxios.post(`/data-user/${id}?_method=PUT`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const submitBerkasOrtu = async (data, pick) => {
  let endpoint = "";

  switch (pick) {
    case "Ayah":
      endpoint = "/data-ayah";
      break;
    case "Ibu":
      endpoint = "/data-ibu";
      break;
    case "Wali":
      endpoint = "/data-wali";
      break;
  }

  try {
    const response = await useAxios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateProfilePicture = async (data) => {
  const id = JSON.parse(getUser()).data_user.id_data_user;
  
  try {
    const response = await useAxios.post(`/data-user/updateProfile/${id}?_method=PUT`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const APIMethod = {
  getUserByID,
  submitBerkas,
  submitBerkasOrtu,
  updateProfilePicture,
};

export default APIMethod;

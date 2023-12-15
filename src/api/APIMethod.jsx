import useAxios from "./APIConstant";
import getUser, { getToken } from "./UserHandler";

const getAllUser = async () => {
  try {
    const response = await useAxios.get("/user", {
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

const updateBerkas = async (data, id) => {
  try {
    const response = await useAxios.post(`/data-user/updateBerkas/${id}?_method=PUT`, data, {
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
  const id = JSON.parse(getUser()).data_user.id_data_user;
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

const updateBerkasOrtu = async (data, pick, ortu) => {
  let endpoint = "";
  let id;

  switch (pick) {
    case "Ayah":
      endpoint = "/data-ayah";
      id = ortu.data_ayah.id_data_ayah;
      break;
    case "Ibu":
      endpoint = "/data-ibu";
      id = ortu.data_ibu.id_data_ibu;
      break;
    case "Wali":
      endpoint = "/data-wali";
      id = ortu.data_wali.id_data_wali;
      break;
  }

  endpoint += `/update/${id}?_method=PUT`

  try {
    const response = await useAxios.put(endpoint, data, {
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

const updateProfilePicture = async (data, id) => {
  try {
    const response = await useAxios.post(
      `/data-user/updateProfile/${id}?_method=PUT`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateIjazah = async (data, id) => {
  try {
    const response = await useAxios.post(
      `/data-user/updateIjazah/${id}?_method=PUT`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getPembayaranByUser = async (id) => {
  try {
    const response = await useAxios.get(`/pembayaran/user/${id}`, {
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

const getHistoryByUser = async (id) => {
  try {
    const response = await useAxios.get(`/pembayaran/history/${id}`, {
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

const APIMethod = {
  getAllUser,
  getUserByID,
  updateBerkas,
  submitBerkas,
  submitBerkasOrtu,
  updateBerkasOrtu,
  updateProfilePicture,
  updateIjazah,
  getPembayaranByUser,
  getHistoryByUser,
};

export default APIMethod;

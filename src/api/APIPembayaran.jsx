import useAxios from "./APIConstant";
import getUser, { getToken } from "./UserHandler";

const tambahPembayaran = async (data) => {
  try {
    const response = await useAxios.post("/pembayaran", data, {
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

const bayarPembayaran = async (data, id) => {
  try {
    const response = await useAxios.post(
      `/pembayaran/${id}?_method=PUT`,
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

const cancelPembayaran = async (id) => {
  try {
    const response = await useAxios.post(
      `/pembayaran/cancel/${id}?_method=PUT`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};

const finishPembayaran = async (id) => {
  try {
    const response = await useAxios.post(
      `/pembayaran/finish/${id}?_method=PUT`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};

const APIPembayaran = {
  tambahPembayaran,
  bayarPembayaran,
  cancelPembayaran,
  finishPembayaran,
};

export default APIPembayaran;

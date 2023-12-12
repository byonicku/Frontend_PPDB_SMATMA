import axios from "axios";

const BASE_URL = '127.0.0.1:8000';
// const BASE_URL = '20.70.51.64:8000';
export const API_URL = `http://${BASE_URL}/api`;

export const getPicture = (name) => {
    return `http://${BASE_URL}/storage/user/${name}`;
  };

const useAxios = axios.create({ baseURL: API_URL });

export default useAxios;
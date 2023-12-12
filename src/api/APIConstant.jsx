import axios from "axios";

const url = '127.0.0.1:8000';
// const url = '20.70.51.64:8000';
export const API_URL = `http://${url}/api`;

const useAxios = axios.create({ baseURL: API_URL });

export default useAxios;
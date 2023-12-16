import axios from "axios";

// Local Development
// const BASE_URL = '127.0.0.1:8000';

// Production
const BASE_URL = 'tugasbesarpw2.azurewebsites.net';

// Local use HTTP
// export const API_URL = `http://${BASE_URL}/api`;

// Production use HTTPS
export const API_URL = `https://${BASE_URL}/api`;


export const getPicture = (name) => {
    // Local Development
    // return `http://${BASE_URL}/storage/user/${name}`;

    // Production
    return `https://${BASE_URL}/storage/user/${name}`;
  };

const useAxios = axios.create({ baseURL: API_URL });

export default useAxios;
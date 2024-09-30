import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_API_URL}/api`;

console.log(BASE_URL, '===BASE_URLBASE_URL');

const Axios = axios.create({
    baseURL: BASE_URL,
});

Axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            //
        } else {
            console.log(error.response, "error.response");
        }

        return Promise.reject(error?.response?.data);
    }
);

export default Axios;

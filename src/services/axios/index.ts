import axios from "axios";
import Cookies from "cookies-js";

export const instance = axios.create({
    baseURL: "http://localhost:3000/"
})

instance.interceptors.request.use(
    (config) => {
        const session = Cookies.get("@session");
        if (session) {
            const { token } = JSON.parse(session);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_BACKENDURL + "/api" : "/api",
    withCredentials: true,
})
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:  import.meta.env.VITE_BACKENDURL + "/api" ,
    withCredentials: true,
})
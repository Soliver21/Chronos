import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 5000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    console.log("Attaching token to request:", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
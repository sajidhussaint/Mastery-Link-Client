import axios from "axios"

const BASE_URL = "http://localhost:3000/"

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const axiosAuthorized = axios.create({
  baseURL: BASE_URL
})

axiosAuthorized.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosAuthorized.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)



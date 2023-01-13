import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACK_URL,
    headers: {
        Authorization: 'Bearer {token}',
        'Content-Type': 'application/json'
    }
})
// window.axios = axios
// window.axios.defaults.baseURL = 'http://localhost:8001'
// window.axios.defaults.headers.common['Content-Type'] = 'application/json'
// window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_current_token')}`
// window.axios.defaults.withCredentials = false

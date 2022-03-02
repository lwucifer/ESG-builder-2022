import axios from 'axios'
import store from '@/store/index'
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

http.interceptors.request.use(
  (config) => {
    try {
      const token = store.getters?.authToken
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      return config
    } catch (error) {
      console.log(error)
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
export default http

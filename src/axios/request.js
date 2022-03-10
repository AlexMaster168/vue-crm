import axios from 'axios'
import { router } from "@/router"

const requestAxios = axios.create({
  baseURL: "https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: "Access-Control-Allow-Origin; http://localhost:8081"
})

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/auth?message=auth')
  }

  return Promise.reject(error)
})

export default requestAxios
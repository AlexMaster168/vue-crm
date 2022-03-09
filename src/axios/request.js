import axios from 'axios'
import { router } from "@/router"

const requestAxios = axios.create({
  baseURL: "vue-crm-1a078.firebaseapp.com"
})

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/auth?message=auth')
  }

  return Promise.reject(error)
})

export default requestAxios
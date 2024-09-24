import axios from 'axios'

export const API = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
})

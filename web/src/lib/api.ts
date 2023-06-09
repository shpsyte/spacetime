import axios from 'axios'
import { parseCookies } from 'nookies'

const { token } = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

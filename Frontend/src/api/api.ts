import axios from 'axios'

export const axiosPrivate = axios.create({
  baseURL: 'https://ia04-jwtauthentication-backend-sypl.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

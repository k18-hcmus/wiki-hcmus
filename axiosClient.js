import axios from 'axios'

const client = axios.create({
  baseURL: process.env.STRAPI_API_URL || 'http://localhost:1337/',
})

export default client

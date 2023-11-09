import axios from "axios"

const API_URL = 'https://frontappapi.dock7.66bit.ru/api'

export const $api = axios.create({
  baseURL: API_URL,
})

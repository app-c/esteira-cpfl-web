import ax from 'axios'

const dev = 'http://localhost:3333'
const prod = 'http://147.182.129.147'

export const api = ax.create({
  baseURL: prod,
  responseType: 'json',
})

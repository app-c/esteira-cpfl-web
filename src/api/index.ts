import ax from 'axios'

const dev = 'http://localhost:3332'
const prod = 'https://147.182.129.147'

export const api = ax.create({
  baseURL: dev,
})

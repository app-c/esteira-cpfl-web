import ax from 'axios'

const dev = 'http://localhost:3333'
const prod = 'https://server.app-com.digital'

export const api = ax.create({
  baseURL: prod,
})

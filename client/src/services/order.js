const axios = require('axios')
const baseUrl = 'http://localhost:3001/api/order'

const getAll = async () => {
  const orders = await axios.get(baseUrl)
  return orders.data
}

const create = async (newOrder) => {
  const order = await axios.post(baseUrl, newOrder)
  return order.data
}

export default { getAll, create }
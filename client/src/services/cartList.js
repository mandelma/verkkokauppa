import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/cart'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (id, item) => {
  const response = await axios.post(`${baseUrl}/${id}`, item)
  return response.data
}

const update = async (id, updatedItem) => {
  const result = await axios.put(`${baseUrl}/${id}`, updatedItem)
  return result.data
}

const remove = async (id) => {
  const delCart = await axios.delete(`${baseUrl}/${id}`)
  return delCart.data
}

const removeAll = async () => {
  const poistettu = await axios.delete(`${baseUrl}`)
  return poistettu.data
}

export default { getAll, create, remove, update, removeAll }
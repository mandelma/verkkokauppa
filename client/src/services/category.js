const axios = require('axios')
const baseUrl = 'http://localhost:3001/api/category'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (cat) => {
  const newCat = await axios.post(baseUrl, cat)
  return newCat.data
}

const addProduct = async (id, product) => {
  const response = await axios.post(`${baseUrl}/${id}/product`, product )
  return response.data
}

const update = async (id, category) => {
  const updated = await axios.put(`${baseUrl}/${id}`, category)
  return updated.data
}

export default { getAll, create, addProduct, update }
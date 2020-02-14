const axios = require('axios')

const baseUrl = 'http://localhost:3001/api/product'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  console.log('product in service', result.data)
  return result.data
}

const create = async (productObject) => {
  const result = await axios.post(baseUrl, productObject)
  return result.data
}

const update = async (id, newProduct) => {
  const product = await axios.put(`${baseUrl}/${id}`, newProduct)
  return product.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, update, remove }
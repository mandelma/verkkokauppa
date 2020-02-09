const axios = require('axios')
const baseUrl = 'http://localhost:3001/api/upload'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (newImageData) => {
  const result = await axios.post(baseUrl, newImageData, {

  })
  return result.data
}

const update = async (id, newImageData) => {
  const result = await axios.put(`${baseUrl}/${id}`, newImageData)
  return result.data
}

export default { getAll, create, update }
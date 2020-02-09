import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/user'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('users services ', response.data)
  return response.data
}

const createUser = async (newUser) => {
  const user = await axios.post(baseUrl, newUser)
  return user.data
}

/* const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const createUser = (newUser) => {
  const req = axios.post(baseUrl, newUser)
  return req.then(response => response.data)
} */


export default { getAll, createUser }
import axios from 'axios'

const API_URL = 'http://localhost:3333/todos'

export const getTodos = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const addTodo = async (title) => {
  const response = await axios.post(API_URL, { title })
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}

export const updateTodo = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data)
}

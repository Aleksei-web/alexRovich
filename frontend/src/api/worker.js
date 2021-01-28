import axios from 'axios';

export const getWorkersDb = () => {
  return axios.get('http://localhost:8080/workers')
}

export const deleteWorkersDb = (id) => {
  return axios.delete(`http://localhost:8080/worker/${id}`)
}

export const createWorkerDb = (name) => {
  return axios.post(`http://localhost:8080/worker`, {name})
}
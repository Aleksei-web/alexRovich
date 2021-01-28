import axios from 'axios';

export const getReasons = () => {
  return axios.get('http://localhost:8080/reasons')
}

export const createReasonDb = (title) => {
  return axios.post('http://localhost:8080/reason', {title})
}

export const deleteReasonDb = (id) => {
  return axios.delete(`http://localhost:8080/reason/${id}`)
}
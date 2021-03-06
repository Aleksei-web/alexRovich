import axios from 'axios';
import {URL_SERVER} from '../config'

export const getReasons = () => {
  return axios.get(`${URL_SERVER}/reasons`, {withCredentials: true})
}

export const createReasonDb = (title, id) => {
  return axios.post( `${URL_SERVER}/reason`, {title, id}, {withCredentials: true})
}

export const deleteReasonDb = (id) => {
  return axios.delete(`${URL_SERVER}/reason/${id}`, {withCredentials: true})
}
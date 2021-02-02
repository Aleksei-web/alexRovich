import axios from 'axios';
import {URL_SERVER} from '../config'

export const getWorkersDb = () => {
  return axios.get(`${URL_SERVER}/workers`, {withCredentials: true})
}

export const deleteWorkersDb = (id) => {
  return axios.delete(`${URL_SERVER}/worker/${id}`, {withCredentials: true})
}

export const createWorkerDb = (name, id) => {
  return axios.post(`${URL_SERVER}/worker`, {name, id}, {withCredentials: true})
}
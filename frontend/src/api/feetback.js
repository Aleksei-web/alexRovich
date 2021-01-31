import axios from 'axios';
import { URL_SERVER } from '../config';

export const saveFeetbackDb = (id_worker, rating, comment, reasons_id) => {
  return axios.post(`${URL_SERVER}/feetback`, {
    id_worker, 
    comment,
    reasons_id,
    rating
  }, {withCredentials: true},)
}
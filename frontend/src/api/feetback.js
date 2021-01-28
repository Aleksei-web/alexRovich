import axios from 'axios';

export const saveFeetbackDb = (id_worker, rating, comment, reasons_id) => {
  return axios.post('http://localhost:8080/feetback', {
    id_worker, 
    comment,
    reasons_id,
    rating
  })
}
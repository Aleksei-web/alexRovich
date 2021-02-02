import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import TableListHistory from '../components/TableListHistory';
import { URL_SERVER } from '../config';

function TableReasons() {
  const [feedback, setFeetback] = useState([]);

  useEffect(() => {

    axios
      .get(`${URL_SERVER}/feetback`, { withCredentials: true })
      .then((res) => {
        setFeetback(res.data);
      });
  }, []);
  return (
    <>
      <div className='container mt-5'>
        <h2 className='mb-5'>Все отзывы</h2>
        {!!feedback.length ? (
            <TableListHistory feedback={feedback} />
          ) : (
            <h2>Отзывов пока нет</h2>
          )}
      </div>
    </>
  )
}

export default TableReasons

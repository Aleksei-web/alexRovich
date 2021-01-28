import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemListReasons from '../components/ItemListReasons';
import ItemWorkersList from '../components/ItemWorkersList';
import { createReasonDb, deleteReasonDb, getReasons } from '../api/reasons';
import { deleteWorkersDb, getWorkersDb, createWorkerDb } from '../api/worker';
import CreateWorkerForm from '../components/CreateWorkerForm';
import CreateReasonsForm from '../components/CreateReasonsForm';
import TableListHistoty from '../components/TableListHistory'
import NavBar from '../components/NavBar';

const AdminDashboard = () => {
  const [reasons, setReasons] = useState([]);
  const [worker, setWorker] = useState([]);
  const [inputReason, setInputReason] = useState('');
  const [inputWorker, setInputWorker] = useState('')
  const [feedback, setFeetback] = useState([]);

  useEffect(() => {
    getReasons().then(res => {
      setReasons(res.data)
    })
    
    getWorkersDb().then(res => {
      setWorker(res.data)
    })

    axios.get('http://localhost:8080/feetback').then(res => {
      console.log(res.data);
      setFeetback(res.data)
    })
  }, [])

  const deleteReasons = (e) => {
    e.preventDefault()
    deleteReasonDb(e.target.value).then(res => {
        if(res.status === 200) {
          setReasons(prev => [...prev.filter(el => el.id != e.target.value)])         
          setInputReason('')
        }
      }
    )
  }

  const createReason = (e) => {
    e.preventDefault()
    createReasonDb(inputReason).then(res => {
      if(res.status === 200) {
        setReasons(prev => [...prev, res.data])
        setInputReason('')
      }
      console.log(res.status)
    })
    console.log(inputReason);
  }

  const deleteWorker = (e) => {
    e.preventDefault()
    deleteWorkersDb(e.target.value).then(res => {
      if(res.status === 200) {
        setWorker(prev => [...prev.filter(el => el.id != e.target.value)])
      }
    })
  }


  const createWorker = (e) => {
    e.preventDefault() 
    createWorkerDb(inputWorker).then(res => {
      if(res.status === 200) {
        setWorker(prev => [...prev, res.data])
        setInputWorker('')
      }
    })
  }

return (
  <>
    <NavBar />

    <div className='container'>
      <h2>Спиcок причин</h2>
      <ul className="list-group">
        { !!reasons.length ? (reasons.map(el => <ItemListReasons 
          id={el.id} 
          title={el.title} 
          deleteReasons={deleteReasons} 
          key={el.id} 
        />
        )) : (
          <li className="list-group-item disabled" aria-disabled="true">Лист пуст</li>
        )
       }
      </ul>
      <h2>Создать причину</h2>
        <CreateReasonsForm
          createReason={createReason} 
          setInputReason={setInputReason} 
          inputReason={inputReason} 
        />
      <h2>Cписок специалистов</h2>


     <ul className="list-group">
        { !!worker.length ? (worker.map(el => <ItemWorkersList deleteWorker={deleteWorker} id={el.id} name={el.name} key={el.id} />
        )) : (
          <li className="list-group-item disabled" aria-disabled="true">Лист пуст</li>
        )
        }
      </ul>


      <h2>Добавить специалиста</h2>
       <CreateWorkerForm
        createWorker={createWorker} 
        inputWorker={inputWorker} 
        setInputWorker={setInputWorker} 
      />

      <h2>Отзывы!</h2>

      { !!feedback.length ? <TableListHistoty feedback={feedback} /> : <h2>Отзывов пока нет</h2> }

        

    </div>

    </>
  )
}

export default AdminDashboard

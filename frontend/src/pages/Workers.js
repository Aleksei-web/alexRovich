import React, { useEffect, useState } from 'react'
import { createWorkerDb, deleteWorkersDb, getWorkersDb } from '../api/worker';
import CreateWorkerForm from '../components/CreateWorkerForm';
import ItemWorkersList from '../components/ItemWorkersList';
import NavBar from '../components/NavBar';
import { toast } from "react-toastify";

const Workers = () => {
  const [worker, setWorker] = useState([]);
  const [inputWorker, setInputWorker] = useState("");
  const [idWorker, setIdWorker] = useState('');
  
  useEffect(() => {
    getWorkersDb().then((res) => {
      setWorker(res.data);
    });
  }, [])

  const deleteWorker = (e) => {
    e.preventDefault();
    deleteWorkersDb(e.target.value).then((res) => {
      if(res.data.error) {
        toast.error(res.data.error)
      }
      else {
        setWorker((prev) => [...prev.filter((el) => el.id != e.target.value)]);
        toast.success('Удаление успешно')
      }
    });
  }

  const createWorker = (e) => {
    e.preventDefault();
    createWorkerDb(inputWorker, idWorker).then((res) => {
      if (res.status === 200) {
        setWorker((prev) => [...prev, res.data]);
        setInputWorker()
        setInputWorker("");
        setIdWorker('')
        toast.success(res.data.name + ' успешно сохранен')
      }
    });
  };

  const updateWorker = (e) => {
    e.preventDefault()
    console.log(e.target.value);
    setInputWorker(worker.filter(el => el.id == e.target.value)[0].name)
    setWorker(prev => prev.filter(el => el.id != e.target.value))
    setIdWorker(e.target.value)   
  }

  return (
    <>

    <NavBar />

    <div className='container'>
        <h2>Добавить специалиста</h2>
        <CreateWorkerForm
          createWorker={createWorker}
          inputWorker={inputWorker}
          setInputWorker={setInputWorker}
        />
       <h2>Cписок специалистов</h2>

      <ul className="list-group">
        {!!worker.length ? (
          worker.map((el) => (
            <ItemWorkersList
              deleteWorker={deleteWorker}
              id={el.id}
              name={el.name}
              key={el.id}
              updateWorker={updateWorker}
            />
          ))
        ) : (
          <li className="list-group-item disabled">
            Лист пуст
          </li>
        )}
      </ul>

    </div>
    </>
  )
}

export default Workers

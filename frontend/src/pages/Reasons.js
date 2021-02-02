import React, { useEffect, useState } from 'react'
import { createReasonDb, deleteReasonDb, getReasons } from '../api/reasons'
import CreateReasonsForm from '../components/CreateReasonsForm'
import UpdateReasonsForm from '../components/forms/UpdateReasonsForm'
import ItemListReasons from '../components/ItemListReasons'
import NavBar from '../components/NavBar'
import { toast } from "react-toastify";

const Reasons = () => {
  const [reasons, setReasons] = useState([]);
  const [inputReason, setInputReason] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false)
  const [idReason, setIdReason] = useState('')

  useEffect(() => {
    getReasons().then((res) => {
      setReasons(res.data);
    });
  }, [])

  const deleteReasons = (e) => {
    e.preventDefault();
    deleteReasonDb(e.target.value).then((res) => {
      if(res.data.error) {
        toast.error(res.data.error)    
      }
      else{
        setReasons((prev) => [...prev.filter((el) => el.id != e.target.value)]);
        setInputReason("");
        toast.success("Удаление прошло успешно")
      } 
    });
  };

  const createReason = (e) => {
    e.preventDefault();
    createReasonDb(inputReason, idReason).then((res) => {
      if (res.status === 200) {
        setReasons((prev) => [...prev, res.data]);
        setInputReason("");
        setIdReason('')
        toast.success(res.data.title + ' сохранен успешно!')
      }
    });
  };

  const updateReason = (e) => {
    e.preventDefault()
    setInputReason(reasons.filter(el =>  el.id == e.target.value)[0].title)
    setReasons(prev => prev.filter(el => el.id != e.target.value))
    setIdReason(e.target.value)
  }

  return (
    <>
    <NavBar />
      <div className='container' style={{position: 'relative'}}>
          <h2>Создать причину</h2>
          <CreateReasonsForm
          updateFlag={updateFlag}
            createReason={createReason}
            setInputReason={setInputReason}
            inputReason={inputReason}
          />

      <h2>Спиcок причин</h2>
        <ul className="list-group">
          {!!reasons.length ? (
            reasons.map((el) => (
              <ItemListReasons
                updateReason={updateReason}
                id={el.id}
                title={el.title}
                deleteReasons={deleteReasons}
                key={el.id}
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

export default Reasons

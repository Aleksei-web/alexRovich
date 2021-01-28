import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const Login = () => {
const [name, setName] = useState('')
const [password, setPassword] = useState('')

const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/login', {user_name: name, password}).then(res => {
      console.log(res);
      if(res.status === 200) {
        history.push('/admin')
      }
    })
  } 

  return (
    <div className="m-auto mt-5 card p-3" style={{width: '20rem'}}>
      <h2>Введите логин и пароль</h2>
      <form onSubmit={login} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Имя пользователя</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="name" 
            className="form-control" 
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">Пароль</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password" 
            className="form-control" 
            id="inputPassword1" 
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">Login</button>
      </form>
    </div>
  )
}

export default Login

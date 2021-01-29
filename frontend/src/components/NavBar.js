import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom'
import { delete_user } from '../redux/actions/user';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import './Nav.css'

 
const NavBar = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  console.log('user====>>', user);

  const logout = () => {
    axios.get('http://localhost:8080/logout').then(res => {
      console.log('delete user');
      window.localStorage.clear('user')
      dispatch(delete_user())
    })
  }

  return (

    <nav 
      className="navbar navbar-expand-lg navbar-light" 
      style={{backgroundColor: "#e3f2fd"}} 
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/admin' className="nav-link">Admin</Link>
            </li>
            {user ? (<li onClick={logout} className="nav-item">
              <span className="nav-link pointer" >Выход</span>              
              </li>
               ) : (
              <li className="nav-item">
                <Link to='/login' className="nav-link">Вход</Link>
              </li>
              )
            }
            <li className="nav-item">
              <Link to='/analitics' className="nav-link">Аналитика</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>   
  )
}

export default NavBar;

import React from 'react';
import {Link} from 'react-router-dom'
 
const NavBar = () => {
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
            <li className="nav-item">
              <Link to='/login' className="nav-link">Вход</Link>
            </li>
            <li className="nav-item">
              <Link to='/admin' className="nav-link">Выход</Link>
            </li>
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

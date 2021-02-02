import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { delete_user } from "../redux/actions/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { URL_SERVER } from "../config";
import "./Nav.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios.get(`${URL_SERVER}/logout`, { withCredentials: true }).then((res) => {
      window.localStorage.clear("user");
      dispatch(delete_user());
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <div  className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" 
                id="navbarDropdown"
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Админ
              </Link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/workers" className="nav-link">
                    Работники
                  </Link>
                </li>

                <li>
                  <Link to="/reasons" className="nav-link">
                    Причины
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/analitics" className="nav-link">
                Аналитика
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">          
            {user ? (
              <li onClick={logout} className="nav-item">
                <span className="nav-link pointer">Выход</span>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Вход
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemListReasons from "../components/ItemListReasons";
import ItemWorkersList from "../components/ItemWorkersList";
import { createReasonDb, deleteReasonDb, getReasons } from "../api/reasons";
import { deleteWorkersDb, getWorkersDb, createWorkerDb } from "../api/worker";
import CreateWorkerForm from "../components/CreateWorkerForm";
import CreateReasonsForm from "../components/CreateReasonsForm";
import TableListHistoty from "../components/TableListHistory";
import NavBar from "../components/NavBar";
import { URL_SERVER } from "../config";

const AdminDashboard = () => {
  
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
      <NavBar />

      <div className="container">
        
       

        <h2>Отзывы!</h2>

        {!!feedback.length ? (
          <TableListHistoty feedback={feedback} />
        ) : (
          <h2>Отзывов пока нет</h2>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

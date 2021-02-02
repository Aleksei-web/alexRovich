import React from "react";

const ItemListReasons = ({ title, deleteReasons, id, updateReason }) => {



  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      {title} id - {id}
      <span>
        <button 
          value={id}
          onClick={deleteReasons}
          className="m-1 btn btn-outline-danger"
        >
          Удалить
        </button>
        <button
          value={id}
          onClick={updateReason}
          className="m-1 btn btn-outline-info"
        >
          Рдактировать
        </button>
      </span>
    </li>
  );
};

export default ItemListReasons;

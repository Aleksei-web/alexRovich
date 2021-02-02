import React from "react";

const ItemWorkersList = ({ name, id, deleteWorker, updateWorker }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      имя -  {name} / id - {id}
      <span>
        <button
          value={id}
          onClick={deleteWorker}
          className="m-1 btn btn-outline-danger"
        >
          Удалить
        </button>
        <button
          value={id}
          onClick={updateWorker}
          className="m-1 btn btn-outline-info"
        >
          Редактировать
        </button>
      </span>
    </li>
  );
};

export default ItemWorkersList;

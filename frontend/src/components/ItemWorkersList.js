import React from "react";

const ItemWorkersList = ({ name, id, deleteWorker }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      {name}
      <span>
        <button
          value={id}
          onClick={deleteWorker}
          className="btn btn-outline-danger"
        >
          Удалить
        </button>
      </span>
    </li>
  );
};

export default ItemWorkersList;

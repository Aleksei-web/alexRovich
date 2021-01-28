import React from 'react'

const ItemListReasons = ({title, deleteReasons, id}) => {



  return (
    <li
      className="list-group-item d-flex justify-content-between">
      {title} 
      <span>
        <button value={id} onClick={deleteReasons} className="btn btn-outline-danger">Удалить</button>
      </span>
    </li>
  )
}

export default ItemListReasons

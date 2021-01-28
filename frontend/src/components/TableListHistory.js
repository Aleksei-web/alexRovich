import React from 'react'

const TableListHistory = ({feedback}) => {
  console.log('feedback', feedback);
  return (
    <table className="table table-secondary border-primary">
    <thead>
      <tr>
        <th scope="col">Дата</th>
        <th scope="col">Сотрудник</th>
        <th scope="col">Оцнка</th>
        <th scope="col">Причина</th>
        <th scope="col">Комментарий</th>
      </tr>
    </thead>
    <tbody>
      { feedback.map((el, i) => <tr key={i} className={ el.rating > 0 ? ('table-success') : ('table-danger') }  >
        <th scope="row">{el.ts}</th>
        <td>{el.name}</td>
        <td>{el.rating}</td>
        <td>{el.title}</td>
        <td>{el.comment}</td>
      </tr>) }
    </tbody>
  </table>
  )
}

export default TableListHistory

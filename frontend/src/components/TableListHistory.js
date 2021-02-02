import React from "react";

const TableListHistory = ({ feedback }) => {

  return (
    <table className="table table-secondary mt-2 table-bordered">
      <thead>
        <tr>
          <th scope='col'>№</th>
          <th scope="col">Дата</th>
          <th scope="col">Сотрудник</th>
          <th scope="col">Оценка</th>
          <th scope="col">Причина</th>
          <th scope="col">Комментарий</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map((el, i) => (
          <tr
            key={i}
            className={el.rating > 2 ? "table-success" : "table-danger"}
          >
             <td>{i + 1}</td>
            <th>
              {el.ts && new Date(el.ts).toISOString().split("T")[0]}
            </th>
            <td>{el.name}</td>
            <td>{el.rating}</td>
            <td>{el.title}</td>
            <td>{el.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableListHistory;

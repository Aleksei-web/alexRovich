import React, { useEffect } from "react";
import { saveFeetbackDb } from "../api/feetback";

const PositiveFeedback = ({ match }) => {
  const id_worker = match.params.id;

  useEffect(() => {
    saveFeetbackDb(id_worker, 1).then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <h2>Спасибо за ваш отзыв</h2>
    </div>
  );
};

export default PositiveFeedback;

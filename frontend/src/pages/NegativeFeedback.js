import React, { useEffect, useState } from "react";

import ButtonSendMessage from "../components/ButtonSendMessage";
import FormSendMessage from "../components/FormSendMessage";
import { saveFeetbackDb } from "../api/feetback";
import { getReasons } from "../api/reasons";
import { useHistory } from "react-router-dom";

const NegativeFeedback = ({ match }) => {
  const [inputValue, setInputValue] = useState("");
  const [reasons, setReasons] = useState([]);
  const [variantRaesone, setVariantReasone] = useState("");

  const id_worker = match.params.id;

  useEffect(() => {
    getReasons().then((res) => {
      setReasons(res.data);
    });
  }, []);

  const history = useHistory()

  const sendFeedback = (e) => {
    e.preventDefault();
    saveFeetbackDb(id_worker, 2, inputValue, variantRaesone).then((res) =>{
      if(res.status === 200) {
        history.push('/bye')
      }
      console.log(res.data)
    }
    );
  };

  return (
    <div className="container">
      <h2 className="mt-4">Укажите причину</h2>
      <div className="mt-5">
        {!!reasons.length ? (
          reasons.map((el) => (
            <ButtonSendMessage
              setInputValue={setInputValue}
              key={el.id}
              setVariantReasone={setVariantReasone}
              id={el.id}
              title={el.title}
            />
          ))
        ) : (
          <h2>Все ок</h2>
        )}
      </div>
      <h2>Комментарий</h2>
      <FormSendMessage
        sendFeedback={sendFeedback}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default NegativeFeedback;

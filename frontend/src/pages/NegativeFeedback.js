import React, { useEffect, useState } from 'react'
import axios from 'axios';

import ButtonSendMessage from '../components/ButtonSendMessage';
import FormSendMessage from '../components/FormSendMessage';
import { saveFeetbackDb } from '../api/feetback';
import { getReasons } from '../api/reasons';

const NegativeFeedback = ({match}) => {
  const [inputValue, setInputValue] = useState('');
  const [reasons, setReasons] = useState([]);
  const [variantRaesone, setVariantReasone] = useState('пичина не указанна');

  const id_worker = match.params.id;

  useEffect(() => {
    getReasons().then(res => {
      setReasons(res.data)
    })
  }, [])

  const sendFeedback = (e) => {
    e.preventDefault()
    saveFeetbackDb(id_worker, -1, inputValue, variantRaesone)
      .then(res => console.log(res.data))
  }

  return (
    <>
      <h2 className="mt-4">Укажите причину</h2>
      <div className='mt-5'>
        { !!reasons.length ? (reasons.map(el => <ButtonSendMessage 
          key={el.id} 
          setVariantReasone={setVariantReasone} 
          id={el.id} title={el.title} />)
          ) : (
          <h2>Все ок</h2>
          )
        }

      </div>
      <h2>Комментарий</h2>
      <FormSendMessage
        sendFeedback={sendFeedback}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  )
}

export default NegativeFeedback;

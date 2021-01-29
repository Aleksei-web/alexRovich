import React from 'react'

const ButtonSendMessage = ({id, title, setVariantReasone, setInputValue}) => {
  return (
    <button 
      onClick={e => {
        setInputValue(title)
        setVariantReasone(e.target.value)
      }} 
      value={id} 
      className="btn btn-outline-success m-2">
      {title}
    </button>
  )
}

export default ButtonSendMessage

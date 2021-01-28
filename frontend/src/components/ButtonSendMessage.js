import React from 'react'

const ButtonSendMessage = ({id, title, setVariantReasone}) => {
  return (
    <button 
      onClick={e => setVariantReasone(e.target.value)} 
      value={id} 
      className="btn btn-outline-success m-2">
      {title}
    </button>
  )
}

export default ButtonSendMessage

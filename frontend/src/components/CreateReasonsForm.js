import React from 'react'

const CreateReasonsForm = ({createReason, setInputReason, inputReason}) => {
  return (
    <form onSubmit={createReason}>
    <div className="mb-3">
      <input 
        type="text" 
        className="form-control" 
        value={inputReason}
        onChange={e => {setInputReason(e.target.value)}}
      />
    </div>
    <button className="btn btn-primary">Cодать</button>
  </form>
  )
}

export default CreateReasonsForm

import React from 'react'

const CreateWorkerForm = ({createWorker, inputWorker, setInputWorker}) => {
  return (
    <form onSubmit={createWorker}>
    <div className="mb-3">
      <input 
        type="text" 
        className="form-control"
        value={inputWorker}
        onChange={e => {setInputWorker(e.target.value)}}
      />
    </div>
    <button className="btn btn-primary">Cодать</button>
  </form>
  )
}

export default CreateWorkerForm

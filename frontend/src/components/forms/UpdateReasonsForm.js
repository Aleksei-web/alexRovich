import React from 'react'
import './style.css'

function UpdateReasonsForm() {
  return (
    <div className='container' style={{position: 'relative'}}>       
    <div className='page_blank'>
        <form>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              // value={inputReason}
              // onChange={e => {setInputReason(e.target.value)}}
            />
          </div>
          <button className="btn btn-primary">Изменить</button>
        </form>
    </div>
      </div>
  )
}

export default UpdateReasonsForm

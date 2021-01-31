import React from "react";

const FormSendMessage = ({ sendFeedback, inputValue, setInputValue }) => {
  return (
    <form onSubmit={sendFeedback} className="mt-3">
      <div className="mb-3">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="form-control"
          value={inputValue}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Отправить
      </button>
    </form>
  );
};

export default FormSendMessage;

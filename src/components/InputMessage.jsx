import React, { useState } from "react";

export default function InputMessage({ sendMessage }) {
  const [inputValue, setInputValue] = useState("");

  //todo input na enter
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!inputValue}
        onClick={() => {
          sendMessage(inputValue);
          setInputValue("");
        }}
      >
        Отправить
      </button>
    </div>
  );
}

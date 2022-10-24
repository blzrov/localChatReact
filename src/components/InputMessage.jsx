import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function InputMessage({ sendMessage, quote, setQuote }) {
  const [inputValue, setInputValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const send = () => {
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="inputMessage">
      {quote.value && (
        <div>
          Ответ на {`${quote.user} ${quote.value}`}
          <button onClick={() => setQuote({})}>X</button>
        </div>
      )}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue) {
            send();
          }
        }}
      />
      <button
        onClick={() => {
          setIsEmojiOpen(!isEmojiOpen);
        }}
      >
        Emoji
      </button>
      <button disabled={!inputValue} onClick={send}>
        Отправить
      </button>
      {isEmojiOpen && (
        <EmojiPicker
          onEmojiClick={(e) => setInputValue(inputValue + e.emoji)}
        />
      )}
    </div>
  );
}

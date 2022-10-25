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
    <div className="inputMessage mb-20">
      {quote.value && (
        <div className="inputMessageQuote messageQuote mb-20">
          <i>Ответ на </i>
          <span className="nameQuote">{quote.user} </span>
          {quote.value.length > 71
            ? quote.value.slice(0, 70) + "..."
            : quote.value}
          <button className="buttonQuote" onClick={() => setQuote({})}>
            x
          </button>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <input
          value={inputValue}
          className="input"
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
        <div className="myEmojiPicker">
          {isEmojiOpen && (
            <EmojiPicker
              onEmojiClick={(e) => setInputValue(inputValue + e.emoji)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

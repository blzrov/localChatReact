import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function InputMessage({ sendMessage }) {
  const [inputValue, setInputValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  return (
    <div className="inputMessage">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue) {
            sendMessage(inputValue);
            setInputValue("");
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
      <button
        disabled={!inputValue}
        onClick={() => {
          sendMessage(inputValue);
          setInputValue("");
        }}
      >
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

import React, { useState, useEffect, useRef, useContext } from "react";
import InputMessage from "./InputMessage";
import { settingsContext } from "../App";

export default function Messages({ messages = [], sendMessage }) {
  const ul = useRef();
  const [quote, setQuote] = useState({});
  const context = useContext(settingsContext);

  useEffect(() => {
    if (!ul.current) return;
    ul.current.scrollTop = ul.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    setQuote({});
  }, [context]);

  return (
    <div>
      {messages.length === 0 ? "Напишите первое сообщение!" : null}
      <ul ref={ul} className="messages mb-20">
        {messages.map((message, index) => {
          const isCurrentUser = context.user === message.user;
          const haveQuote = message.quote?.value && message.quote?.user;
          return (
            <li
              key={index}
              className={isCurrentUser ? "currentUserMessage" : ""}
            >
              {haveQuote && (
                <div className="messageQuote">
                  <span className="nameQuote">
                    <i>В ответ: </i>
                    {message.quote.user + ": "}
                  </span>
                  {message.quote.value.length > 71
                    ? message.quote.value.slice(0, 70) + "..."
                    : message.quote.value}
                </div>
              )}
              {!isCurrentUser && <span className="name">{message.user}: </span>}
              {message.value}
              <button
                className="buttonQuote"
                disabled={quote.value}
                onClick={() => {
                  setQuote(message);
                }}
              >
                +
              </button>
            </li>
          );
        })}
      </ul>
      <InputMessage
        sendMessage={sendMessage}
        quote={quote}
        setQuote={setQuote}
      />
    </div>
  );
}

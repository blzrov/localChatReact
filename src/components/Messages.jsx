import React, { useState, useEffect, useRef } from "react";
import InputMessage from "./InputMessage";

export default function Messages({ currentUser, messages, sendMessage }) {
  const ul = useRef();

  useEffect(() => {
    if (!ul.current) return;
    ul.current.scrollTop = ul.current.scrollHeight;
  }, [messages]);

  const [quote, setQuote] = useState({});

  if (!messages)
    return (
      <>
        <div className="writeFirst">Напишите первым!</div>
        {currentUser && (
          <InputMessage
            sendMessage={sendMessage}
            quote={quote}
            setQuote={setQuote}
          />
        )}
      </>
    );

  return (
    <>
      <ul ref={ul} className="messages mb-20">
        {messages.map((message, index) => {
          const isCurrentUser = currentUser === message.user;
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
      {currentUser && (
        <InputMessage
          sendMessage={sendMessage}
          quote={quote}
          setQuote={setQuote}
        />
      )}
    </>
  );
}

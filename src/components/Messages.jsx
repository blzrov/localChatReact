import React from "react";

export default function Messages({ currentUser, messages, quote, setQuote }) {
  if (!messages) return <div>Напишите первым!</div>;
  return (
    <ul className="messages">
      {messages.map((message, index) => {
        const isCurrentUser = currentUser === message.user;
        return (
          <li key={index} className={isCurrentUser ? "currentUserMessage" : ""}>
            {!isCurrentUser && <span className="name">{message.user}: </span>}
            <div className="messageQuote">
              {message.quote?.value && `В ответ на ${message.quote?.value}`}
            </div>
            <span>{message.value}</span>
            <button
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
  );
}

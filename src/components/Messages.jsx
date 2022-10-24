import React from "react";

export default function Messages({ currentUser, messages }) {
  if (!messages) return <div>Напишите первым!</div>;
  return (
    <ul>
      {messages.map((message, index) => {
        const isCurrentUser = currentUser === message.user;
        return (
          <li key={index} className={isCurrentUser ? "my" : ""}>
            {isCurrentUser ? null : (
              <span className="name">{message.user}: </span>
            )}
            <span>{message.value}</span>
          </li>
        );
      })}
    </ul>
  );
}

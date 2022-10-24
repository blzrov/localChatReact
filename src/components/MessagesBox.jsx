import React from "react";

export default function MessagesBox(props) {
  if (!props.messages) return;
  return (
    <ul>
      {props.messages.map((message, i) => {
        return (
          <li key={i} className={props.user === message.user ? "my" : ""}>
            {props.user === message.user ? "" : message.user} {message.value}
          </li>
        );
      })}
    </ul>
  );
}

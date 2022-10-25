import React from "react";

export default function Messages({ currentUser, messages, quote, setQuote }) {
  const ul = React.useRef();
  React.useEffect(() => {
    if (!ul.current) return;
    ul.current.scrollTop = ul.current.scrollHeight;
  }, [messages]);

  if (!messages) return <div className="messages mb-20">Напишите первым!</div>;
  return (
    <ul ref={ul} className="messages mb-20">
      {messages.map((message, index) => {
        const isCurrentUser = currentUser === message.user;
        const haveQuote = message.quote?.value && message.quote?.user;
        return (
          <li key={index} className={isCurrentUser ? "currentUserMessage" : ""}>
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
  );
}

import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import InputMessage from "./InputMessage";
import { settingsContext } from "../App";

export default function Messages({ messages = [], sendMessage }) {
  const ulRef = useRef();
  const [quote, setQuote] = useState({});
  const context = useContext(settingsContext);

  useEffect(() => {
    setQuote({});
  }, [context]);

  useEffect(() => {
    if (!ulRef.current) return;
    ulRef.current.scrollTop = ulRef.current.scrollHeight;
  }, [messages, quote]);

  return (
    <div>
      {messages.length === 0 ? "Напишите первое сообщение!" : null}
      <ul ref={ulRef} className="messages mb-20">
        {messages.map((message, index) => {
          const isCurrentUser = context.user === message.user;
          const haveQuote = message.quote?.value && message.quote?.user;
          return (
            <li
              key={index}
              className={
                isCurrentUser ? "message currentUserMessage" : "message"
              }
            >
              {haveQuote && (
                <div>
                  <i className="tooltipI">В ответ: </i>
                  <Tooltip
                    arrow={true}
                    title={message.quote.value}
                    placement="top"
                  >
                    <Button className="tooltipButton" size="small">
                      <span className="tooltipName">{message.quote.user}</span>
                    </Button>
                  </Tooltip>
                </div>
              )}
              {!isCurrentUser && <span className="name">{message.user}: </span>}
              {message.media ? (
                <message.media
                  width={160}
                  src={message.value}
                  alt=""
                  controls
                />
              ) : (
                message.value
              )}
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
        {quote.value && (
          <li className="inputMessageQuote mb-20">
            <i className="tooltipI">Ответ на: </i>
            <Tooltip arrow={true} title={quote.value} placement="top">
              <Button className="tooltipButton" size="small">
                <span className="tooltipName">{quote.user}</span>
              </Button>
            </Tooltip>
            <button className="buttonQuote" onClick={() => setQuote({})}>
              x
            </button>
          </li>
        )}
      </ul>
      <InputMessage
        sendMessage={sendMessage}
        quote={quote}
        setQuote={setQuote}
      />
    </div>
  );
}

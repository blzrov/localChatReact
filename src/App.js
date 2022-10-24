import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState({});

  const dataRef = useRef();

  const getData = useCallback(async () => {
    dataRef.current = await JSON.parse(localStorage.getItem("data"));
    setData(dataRef.current);
  }, []);

  const saveData = () => {
    localStorage.setItem("data", JSON.stringify(dataRef.current));
    getData();
  };

  const sendMessage = (value) => {
    if (!dataRef.current[room]) {
      dataRef.current[room] = [];
    }
    dataRef.current[room].push({ user, value, quote: quote || null });
    setQuote({});
    saveData();
  };

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify({}));
    }
    getData();
    window.addEventListener("storage", getData);
    return () => window.removeEventListener("storage", getData);
  }, [getData]);

  return (
    <div className="wrapper">
      <Settings user={user} room={room} setUser={setUser} setRoom={setRoom} />
      <div>
        {room && (
          <Messages
            currentUser={user}
            messages={data[room]}
            quote={quote}
            setQuote={setQuote}
          />
        )}
        {user && room && (
          <InputMessage
            sendMessage={sendMessage}
            quote={quote}
            setQuote={setQuote}
          />
        )}
      </div>
    </div>
  );
}

export default App;

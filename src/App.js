import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Messages from "./components/Messages";

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");
  const [data, setData] = useState([]);
  const dataRef = useRef();

  const getData = useCallback(async () => {
    dataRef.current = await JSON.parse(localStorage.getItem("data"));
    setData(dataRef.current);
  }, []);

  const saveData = () => {
    localStorage.setItem("data", JSON.stringify(dataRef.current));
    getData();
  };

  const sendMessage = (value, quote) => {
    if (!dataRef.current[room]) {
      dataRef.current[room] = [];
    }
    dataRef.current[room].push({ user, value, quote: quote || null });
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
    <div className="App">
      <Settings user={user} room={room} setUser={setUser} setRoom={setRoom} />
      {user && room ? (
        <Messages
          currentUser={user}
          messages={data[room]}
          sendMessage={sendMessage}
        />
      ) : (
        "Введите имя и комнату"
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";

function App() {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState();

  const dataRef = React.useRef();

  useEffect(() => {
    if (!localStorage.getItem("belozerov")) {
      localStorage.setItem("belozerov", JSON.stringify({}));
    }
    Update();
    window.addEventListener("storage", Update);
    return () => window.removeEventListener("storage", Update);
  }, []);

  function Update() {
    dataRef.current = JSON.parse(localStorage.getItem("belozerov"));
    setData(dataRef.current);
  }

  function Save() {
    localStorage.setItem("belozerov", JSON.stringify(dataRef.current));
    Update();
  }

  const sendMessage = (message) => {
    if (!dataRef.current[room]) {
      dataRef.current[room] = [];
    }
    dataRef.current[room].push({ user, value: message });
    Save();
  };

  return (
    <div className="App">
      <Settings setUser={setUser} setRoom={setRoom} />
      <div>
        {room && <Messages currentUser={user} messages={data[room]} />}
        {user && room && <InputMessage sendMessage={sendMessage} />}
      </div>
    </div>
  );
}

export default App;

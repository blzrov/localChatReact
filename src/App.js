import React, { useState, useEffect } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Messages from "./components/Messages";
import InputMessage from "./components/InputMessage";

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");
  const [data, setData] = useState([]);

  const dataRef = React.useRef();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify({}));
    }
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const update = () => {
    dataRef.current = JSON.parse(localStorage.getItem("data"));
    setData(dataRef.current);
  };

  const save = () => {
    localStorage.setItem("data", JSON.stringify(dataRef.current));
    update();
  };

  const sendMessage = (value) => {
    if (!dataRef.current[room]) {
      dataRef.current[room] = [];
    }
    dataRef.current[room].push({ user, value });
    save();
  };

  return (
    <div className="App">
      <Settings user={user} room={room} setUser={setUser} setRoom={setRoom} />
      <div>
        {room && <Messages currentUser={user} messages={data[room]} />}
        {user && room && <InputMessage sendMessage={sendMessage} />}
      </div>
    </div>
  );
}

export default App;

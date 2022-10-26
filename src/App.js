import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.scss";
import Settings from "./components/Settings";
import Messages from "./components/Messages";

export const settingsContext = React.createContext({});

function App() {
  const [settings, setSettings] = useState({});
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

  const sendMessage = (value, quote, media) => {
    if (!dataRef.current[settings.room]) {
      dataRef.current[settings.room] = [];
    }
    dataRef.current[settings.room].push({
      user: settings.user,
      value: value,
      quote: quote || null,
      media: media || null,
    });
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
      <Settings setSettings={setSettings} />
      {settings.user && settings.room ? (
        <settingsContext.Provider value={settings}>
          <Messages messages={data[settings.room]} sendMessage={sendMessage} />
        </settingsContext.Provider>
      ) : (
        "Введите имя и комнату"
      )}
    </div>
  );
}

export default App;

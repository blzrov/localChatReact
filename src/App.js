import React from "react";
import "./App.css";
import MessagesBox from "./components/MessagesBox";

function App() {
  const [user, setUser] = React.useState();
  const [room, setRoom] = React.useState();
  const [data, setData] = React.useState();

  const dataRef = React.useRef();

  React.useEffect(() => {
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
    setValue("");
  }

  const [value, setValue] = React.useState("");
  const buttonClick = () => {
    if (!dataRef.current[room]) {
      dataRef.current[room] = [];
    }
    dataRef.current[room].push({ user, value });
    Save();
  };
  //todo input na enter
  return (
    <div className="App">
      <div>
        <div>
          <p>Юзер</p>
          <input onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <p>Комната</p>
          <input onChange={(e) => setRoom(e.target.value)} />
        </div>
      </div>
      {room && (
        <div>
          <MessagesBox user={user} messages={data[room]} />
          {user && (
            <>
              <input value={value} onChange={(e) => setValue(e.target.value)} />
              <button type="submit" disabled={!value} onClick={buttonClick}>
                Отправить
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

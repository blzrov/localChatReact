import React from "react";
import Main from "./components/Main";

function App() {
  const [user, setUser] = React.useState();
  const [room, setRoom] = React.useState();

  const baza = React.useRef();

  React.useEffect(() => {
    // localStorage.clear();
    if (!localStorage.getItem("belozerov")) {
      localStorage.setItem("belozerov", JSON.stringify({}));
    }
    baza.current = JSON.parse(localStorage.getItem("belozerov"));
  }, []);
  React.useEffect(() => {
    console.log(baza.current[room]);
  });
  React.useEffect(() => {
    window.addEventListener("storage", Update);
  }, []);

  function Update() {
    baza.current = JSON.parse(localStorage.getItem("belozerov"));
  }

  function Save() {
    localStorage.setItem("belozerov", JSON.stringify(baza.current));
  }

  const [value, setValue] = React.useState("");
  const buttonClick = () => {
    if (!baza.current[room]) {
      baza.current[room] = [];
    }
    baza.current[room].push({ user, value });
    console.log(baza.current);
    Save();
    Update();
    console.log(baza.current);
  };

  return (
    <div className="App">
      <div>
        <div>
          <div>
            Юзер <input onChange={(e) => setUser(e.target.value)} />
          </div>
          <div>
            Комната <input onChange={(e) => setRoom(e.target.value)} />
          </div>
        </div>
      </div>
      {room && (
        <div>
          <div className="main">
            <div>Тут типо сообщение</div>
            <Main data={baza.current[room]} />
          </div>
          {user && (
            <>
              <input onChange={(e) => setValue(e.target.value)} />
              <button type="submit" onClick={buttonClick}>
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

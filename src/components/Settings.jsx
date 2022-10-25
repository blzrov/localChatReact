import React, { useState } from "react";

export default function Settings({ setSettings }) {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");

  // eslint-disable-next-line
  React.useEffect(() => setSettings({ user, room }), []);

  return (
    <div className="mb-20">
      <div>
        <div>
          <label htmlFor="user">Ваше имя</label>
        </div>
        <input
          id="user"
          value={user}
          className="input"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
      </div>

      <div>
        <div>
          <label htmlFor="room">Комната</label>
        </div>
        <input
          id="room"
          value={room}
          className="input"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </div>

      <div className="mt-10">
        <button
          onClick={() => {
            setSettings({});
            if (user && room) {
              setSettings({ user, room });
              sessionStorage.setItem("user", user);
              sessionStorage.setItem("room", room);
            }
          }}
        >
          Подтвердить
        </button>

        <button
          onClick={() => {
            setUser("");
            setRoom("");
            setSettings({});
            sessionStorage.clear();
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

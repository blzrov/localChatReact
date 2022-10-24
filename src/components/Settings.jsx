import React from "react";

export default function Settings({ user, room, setUser, setRoom }) {
  return (
    <div className="settings">
      <div>
        <p>Ваше имя</p>
        <input
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
            sessionStorage.setItem("user", e.target.value);
          }}
        />
      </div>
      <div>
        <p>Комната</p>
        <input
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
            sessionStorage.setItem("room", e.target.value);
          }}
        />
      </div>
    </div>
  );
}

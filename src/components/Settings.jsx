import React from "react";

export default function Settings({ user, room, setUser, setRoom }) {
  return (
    <div className="settings">
      <div>
        <div>
          <label htmlFor="user">Ваше имя</label>
        </div>
        <input
          id="user"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
            sessionStorage.setItem("user", e.target.value);
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
          onChange={(e) => {
            setRoom(e.target.value);
            sessionStorage.setItem("room", e.target.value);
          }}
        />
      </div>
    </div>
  );
}

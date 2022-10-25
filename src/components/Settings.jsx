import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Settings({ setSettings }) {
  const [user, setUser] = useState(() => sessionStorage.getItem("user") || "");
  const [room, setRoom] = useState(() => sessionStorage.getItem("room") || "");

  // eslint-disable-next-line
  React.useEffect(() => setSettings({ user, room }), []);

  return (
    <div className="mt-10 mb-20">
      <div>
        <div>
          <TextField
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            id="outlined-basic"
            label="Ваше имя"
            variant="outlined"
            size="small"
            margin="dense"
          />
        </div>

        <div>
          <TextField
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            id="outlined-basic"
            label="Комната"
            variant="outlined"
            size="small"
            margin="dense"
          />
        </div>
      </div>

      <div className="mt-10">
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Button
            onClick={() => {
              setSettings({});
              if (user && room) {
                setSettings({ user, room });
                sessionStorage.setItem("user", user);
                sessionStorage.setItem("room", room);
              }
            }}
            variant="contained"
            size="small"
          >
            Подтвердить
          </Button>

          <Button
            onClick={() => {
              setUser("");
              setRoom("");
              setSettings({});
              sessionStorage.clear();
            }}
            variant="outlined"
            size="small"
            color="error"
          >
            Выйти
          </Button>
        </Stack>
      </div>
    </div>
  );
}

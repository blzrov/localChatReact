import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const exampleData = {
  audio: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
  img: "https://sun3-10.userapi.com/impg/5ZHeMnCHMP7Fnv7UDjrqCfLSI0BxdnARjwBw5Q/3dOraKoMFzw.jpg?size=1080x1080&quality=95&sign=27d81a297d36ab6c2fa81dd2c239f4ba&type=album",
  video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
};

export default function Media(props) {
  const [alignment, setAlignment] = useState("img");
  const [example, setExample] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid blue",
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={example}
        exclusive
        onChange={(e) => {
          setExample(e.target.value);
          setAlignment(e.target.value);
          setInputValue(exampleData[e.target.value]);
        }}
        aria-label="Platform"
      >
        <ToggleButton value="audio">Пример</ToggleButton>
        <ToggleButton value="img">Пример</ToggleButton>
        <ToggleButton value="video">Пример</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={(e) => {
          setExample(null);
          setAlignment(e.target.value);
        }}
        aria-label="Platform"
      >
        <ToggleButton value="audio">Аудио</ToggleButton>
        <ToggleButton value="img">Фото</ToggleButton>
        <ToggleButton value="video">Видео</ToggleButton>
      </ToggleButtonGroup>
      <div>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="standard-basic"
          label="Вставьте URL"
          variant="standard"
          margin="normal"
        />
      </div>
      <Button
        disabled={!inputValue}
        onClick={() => props.send(inputValue, alignment)}
        variant="contained"
        color="success"
        size="small"
      >
        Отправить
      </Button>
    </div>
  );
}

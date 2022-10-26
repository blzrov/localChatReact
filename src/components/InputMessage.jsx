import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Media from "./InputMessageMedia";
import EmojiPicker from "emoji-picker-react";
import { settingsContext } from "../App";

export default function InputMessage({ sendMessage, quote, setQuote }) {
  const [value, setValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const context = useContext(settingsContext);
  React.useEffect(() => setValue(""), [context]);

  const send = (inputMedia, media) => {
    inputMedia && media
      ? sendMessage(inputMedia, quote, media)
      : sendMessage(value, quote, null);

    setValue("");
    setIsEmojiOpen(false);
    setIsMediaOpen(false);
    setQuote({});
  };

  return (
    <div className="inputMessage mb-20">
      <Stack direction="row" justifyContent="center" spacing={0.5}>
        <Box
          sx={{
            width: 720,
            maxWidth: "50%",
          }}
        >
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value) {
                send();
              }
            }}
            placeholder="Введите сообщение..."
            fullWidth
            hiddenLabel
            id="filled-basic"
            variant="filled"
            size="small"
          />
        </Box>

        <Button
          onClick={() => {
            if (isEmojiOpen) {
              setIsEmojiOpen(false);
              return;
            }
            setIsEmojiOpen(true);
            setIsMediaOpen(false);
          }}
          variant="contained"
          color="secondary"
          size="small"
        >
          Emoji
        </Button>

        <Button
          onClick={() => {
            if (isMediaOpen) {
              setIsMediaOpen(false);
              return;
            }
            setIsMediaOpen(true);
            setIsEmojiOpen(false);
          }}
          variant="contained"
          color="secondary"
          size="small"
        >
          Медиа
        </Button>

        <Button
          disabled={!value}
          onClick={send}
          variant="contained"
          color="success"
          size="small"
        >
          Отправить
        </Button>
      </Stack>

      <div className="wrapperMedia">
        {isMediaOpen && <Media send={send} />}
        {isEmojiOpen && (
          <EmojiPicker
            lazyLoadEmojis={true}
            skinTonesDisabled={true}
            searchDisabled={true}
            onEmojiClick={(e) => setValue(value + e.emoji)}
          />
        )}
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmojiPicker from "emoji-picker-react";

import { settingsContext } from "../App";
import Media from "./inputMedia";

export default function InputMessage({ sendMessage, quote, setQuote }) {
  const [inputValue, setInputValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const context = useContext(settingsContext);

  const send = (inputMedia, media) => {
    inputMedia && media
      ? sendMessage(inputMedia, quote, media)
      : sendMessage(inputValue, quote, null);

    setQuote({});
    setInputValue("");
    setIsEmojiOpen(false);
    setIsMediaOpen(false);
  };

  React.useEffect(() => setInputValue(""), [context]);
  //quote в массагес?
  return (
    <div className="mb-20">
      <div className="inputMessageMain">
        <Stack direction="row" justifyContent="center" spacing={0.5}>
          <Box
            sx={{
              width: 720,
              maxWidth: "50%",
            }}
          >
            <TextField
              fullWidth
              hiddenLabel
              value={inputValue}
              placeholder="Введите сообщение..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue) {
                  send();
                }
              }}
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
            disabled={!inputValue}
            onClick={send}
            variant="contained"
            color="success"
            size="small"
          >
            Отправить
          </Button>
        </Stack>

        <div className="myEmojiPicker">
          {isMediaOpen && <Media send={send} />}
          {isEmojiOpen && (
            <EmojiPicker
              lazyLoadEmojis={true}
              skinTonesDisabled={true}
              searchDisabled={true}
              onEmojiClick={(e) => setInputValue(inputValue + e.emoji)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

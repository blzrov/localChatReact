import React, { useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmojiPicker from "emoji-picker-react";
import { settingsContext } from "../App";

export default function InputMessage({ sendMessage, quote, setQuote }) {
  const [inputValue, setInputValue] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const context = useContext(settingsContext);

  const send = () => {
    sendMessage(inputValue, quote);
    setQuote({});
    setInputValue("");
    setIsEmojiOpen(false);
  };

  React.useEffect(() => setInputValue(""), [context]);
  //quote в массагес?
  return (
    <div className="inputMessage mb-20">
      {quote.value && (
        <div className="inputMessageQuote mb-20">
          <i className="tooltipI">Ответ на: </i>
          <Tooltip open={true} arrow={true} title={quote.value} placement="top">
            <Button size="small">
              <span className="tooltipName">{quote.user}</span>
            </Button>
          </Tooltip>
          <button className="buttonQuote" onClick={() => setQuote({})}>
            x
          </button>
        </div>
      )}
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
              setIsEmojiOpen(!isEmojiOpen);
            }}
            variant="contained"
            color="secondary"
            size="small"
          >
            Emoji
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

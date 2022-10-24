import React from "react";

export default function Chat() {
  const [value, setValue] = React.useState("");
  const buttonClick = () => {
    console.log(value);
    // localStorage.belozerov;
  };

  return (
    <div>
      <div className="main">
        <div>Тут типо сообщение</div>
      </div>
      <input onChange={(e) => setValue(e.target.value)} />
      <button type="submit" onClick={buttonClick}>
        Отправить
      </button>
    </div>
  );
}

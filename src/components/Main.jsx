import React from "react";

export default function Main(props) {
  return (
    <ul>
      {props.data.map((e, i) => {
        return (
          <li key={i}>
            {e.user}:{e.value}
          </li>
        );
      })}
    </ul>
  );
}

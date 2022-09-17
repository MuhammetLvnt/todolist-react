import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Test() {
  const [variable, setVariable] = useState([]);
  // useEffect(() => {
  //   fetch("https://6317aca7ece2736550b8f7fd.mockapi.io/todos")
  //     .then((response) => response.json())
  //     .then((response) => setVariable(response));
  // }, []);

  useEffect(async () => {
    await axios
      .get("https://6317aca7ece2736550b8f7fd.mockapi.io/todos")
      .then((response) => setVariable(response.data));
  }, []);

  return (
    <div>
      <h1>Test</h1>
      {variable.map((tod) => {
        return (
          <div>
            <h2>{tod.content}</h2>
            <h4>{tod.id}</h4>
          </div>
        );
      })}
    </div>
  );
}

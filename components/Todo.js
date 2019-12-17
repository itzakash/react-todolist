import React from "react";

export default props => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div
      className={props.todo.complete ? "line" : ""}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    <button onClick={props.deleteTodo}>x</button>
  </div>
);

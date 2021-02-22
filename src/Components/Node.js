import React from "react";
import "./Node.css";

const Node = (props) => {
  //console.log(props.isStart);
  const classes = props.isStart
    ? "node-start"
    : props.isEnd
    ? "node-end"
    : props.isWall
    ? "wall"
    : "";
  return (
    <button
      className={`Node ${classes}`}
      id={`node-${props.row}-${props.col}`}
      onMouseOver={(x, y) => props.OnEnter(props.row, props.col)}
      onMouseDown={(x, y) => props.OnDown(props.row, props.col)}
      onMouseUp={() => props.OnUp()}
    />
  );
};

export default Node;

import React from "react";
import { Html } from "react-konva-utils";

function getStyle(width, height) {
  return (baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
  });
}

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
}) {
  const style = getStyle(width, height);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        f={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </Html>
  );
}

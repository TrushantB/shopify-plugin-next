import React from "react";
import { Html } from "react-konva-utils";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableText({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  text,
  width,
  height,
}) {
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  //   if (isEditing) {
  return (
    <Html groupProps={{ x, y }}>
      <textarea value={text} onChange={onChange} />
    </Html>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

const DesignTextView = ({
  onSelect,
  onChange,
  design,
  index,
  selectedTransform,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [editableText, setEditableText] = useState(false);
  const [inputValue, setInputValue] = useState(design.text);
  let textLines = (inputValue?.match(/\n/g) || []).length + 1;
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setEditableText(false);
    const _design = {
      ...design,
      text: `${inputValue}`.trim(),
    };
    onChange(_design, index);
    setInputValue(`${inputValue}`.trim())
  };
  const handleFocus = (event) => {
    event.target.setSelectionRange(inputValue.length, inputValue.length);
  };

  useEffect(() => {
    if (selectedTransform !== null) {
      trRef?.current?.setNode(shapeRef.current);
      trRef?.current?.getLayer().batchDraw();
    }
  }, [selectedTransform]);
  return (
    <React.Fragment>
      {!editableText ? (
        <Text
          ref={shapeRef}
          text={design.text}
          draggable
          fontSize={design.height}
          x={design.x}
          y={design.y}
          fill={design.color}
          lineHeight={1}
          onClick={(e) => {
            onSelect(e, index);
          }}
          onDblClick={async (e) => {
            await onSelect(e, null);
            setEditableText(true);
          }}
          onDragMove={(e) => {
            const x = (e.target.x() + design.width) > 300 ? 300 - design.width : e.target.x() > 0 ? e.target.x() : 0;
            const y = (e.target.y() + design.height * textLines) > 350 ? 350 - design.height * textLines : e.target.y() > 0 ? e.target.y() : 0;
            shapeRef.current.x(x);
            shapeRef.current.y(y);
            const _design = {
              ...design,
              x,
              y,
            };
            onChange(_design, index);
          }}
          onDragEnd={(e) => {
            const _design = {
              ...design,
              x: e.target.x(),
              y: e.target.y(),
            };
            onChange(_design, index);
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            const _design = {
              ...design,
              x: e.target.x(),
              y: e.target.y(),
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max((node.height() / textLines) * scaleY),
            };
            onChange(_design, index);
          }}
          fontFamily="system-ui, -apple-system,' Segoe UI', Roboto,'Helvetica Neue','Noto Sans','Liberation Sans', Arial, sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"
          fontStyle="400"

        />
      ) : (
        <Html
          divProps={{
            style: {
              opacity: 1,
              position: "absolute",
              left: `${design.x}px`,
              top: `${design.y}px`,
              border: 0,
              padding: 0,
              margin: 0,
              color: `${design.color}`
            },
          }}
        >
          <textarea
            value={inputValue}
            className="bg-transparent "
            onChange={handleChange}
            // onKeyUp={handleKeyUp}
            autoFocus
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              fontSize: `${design.height}px`,
              height: `${design.height * textLines}px`,
              width: "100%",
              resize: "none",
              padding: 0,
              lineHeight: 1,
              border: 0,
            }}
          />
        </Html>
      )}
      {selectedTransform === index && (
        <Transformer
          ref={trRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          onDragMove={(e) => {
            const x = (e.target.x() + design.width) > 300 ? 300 - design.width : e.target.x() > 0 ? e.target.x() : 0;
            const y = (e.target.y() + design.height * textLines) > 350 ? 350 - design.height * textLines : e.target.y() > 0 ? e.target.y() : 0;
            shapeRef.current.x(x);
            shapeRef.current.y(y);
            const _design = {
              ...design,
              x,
              y,
            };
            onChange(_design, index);
          }}
          boundBoxFunc={(oldBox, newBox) => {
            const isBoundaryX = 300 < newBox.width + newBox.x;
            const isBoundaryY = 350 < newBox.height + newBox.y;
            if (newBox.width < 10 || newBox.height < 10 || isBoundaryX || isBoundaryY) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
export default DesignTextView;

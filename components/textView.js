import React, { useRef, useState, useEffect } from 'react'
import { Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

const DesignTextView = ({ onSelect, onChange, design, index, selectedTransform }) => {
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
            text: inputValue,
        };
        onChange(_design, index);
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
                    onClick={(e) => {
                        onSelect(e, index)
                    }}
                    onDblClick={async (e) => {
                        await onSelect(e, null)
                        setEditableText(true)
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
                            height: Math.max(node.height() / textLines * scaleY),
                        };
                        onChange(_design, index);
                    }}
                />
            ) : (
                <Html
                    divProps={{
                        style: {
                            opacity: 1,
                            position: "absolute",
                            left: `${design.x - design.x / design.width}px`,
                            top: `${design.y - design.y / design.height}px`,
                            border: 0,
                            padding: 0,
                            margin: 0,
                            color: `${design.color}`,

                        },
                    }}
                >
                    {
                        console.log(design)
                    }
                    <textarea
                        value={inputValue}
                        className="bg-transparent"
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
                    onTransform={(e) => {
                        console.log(e);
                    }}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
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
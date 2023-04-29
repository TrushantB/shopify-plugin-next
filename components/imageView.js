import React, { useRef, useState, useEffect } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const DesignImageView = ({
  onSelect,
  onChange,
  design,
  index,
  selectedTransform,
}) => {
  const [image] = useImage(design.url, "Anonymous");
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (selectedTransform !== null) {
      trRef?.current?.setNode(shapeRef.current);
      trRef?.current?.getLayer().batchDraw();
    }
  }, [selectedTransform]);

  return (
    <React.Fragment>
      <Image
        ref={shapeRef}
        image={image}
        draggable
        width={design.width}
        height={design.height}
        x={design.x}
        y={design.y}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          const _design = {
            ...design,
            x: e.target.x(),
            y: e.target.y(),
          };
          onChange(_design, index);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const _design = {
            ...design,
            x: e.target.x(),
            y: e.target.y(),
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          };
          onChange(_design, index);
        }}
      />
      {selectedTransform && ( //lectedIndex
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
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

export default DesignImageView;

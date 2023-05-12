import React, { useRef, useEffect } from "react";
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

  const onDragMove = (e) => {
    const x = (e.target.x() + e.target.width()) > 300 ? 300 - e.target.width() : e.target.x() > 0 ? e.target.x() : 0;
    const y = (e.target.y() + e.target.height()) > 350 ? 350 - e.target.height() : e.target.y() > 0 ? e.target.y() : 0;
    shapeRef.current.x(x);
    shapeRef.current.y(y);
    const _design = {
      ...design,
      x,
      y,
    };
    onChange(_design, index);
  }
  const onTransformEnd = (e) => {
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
      rotation: e.target.rotation(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max((node.height()) * scaleY),
    };
    onChange(_design, index);
  }
  const boundBoxFunc = (oldBox, newBox) => {
    const isBoundaryX = 300 < newBox.width + newBox.x ? true : newBox.x < 8 ? true : false;
    const isBoundaryY = 350 < newBox.height + newBox.y ? true : newBox.y < 0 ? true : false;
    if (newBox.width < 10 || newBox.height < 10 || isBoundaryX || isBoundaryY) {
      return oldBox;
    }
    return newBox;
  }

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
        onClick={(e) => {
          onSelect(e, index);
        }}
        onDragMove={onDragMove}
        onTransformEnd={onTransformEnd}
      />
      {selectedTransform === index && (
        <Transformer
          ref={trRef}
          onDragMove={onDragMove}
          boundBoxFunc={(oldBox, newBox) => boundBoxFunc(oldBox, newBox)}
        />
      )}
    </React.Fragment>
  );
};

export default DesignImageView;

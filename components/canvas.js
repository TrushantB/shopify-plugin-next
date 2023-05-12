import { IMAGE, SPIRAL, SPIRAL_IMAGE } from "@/lib/constants";
import { useEffect, useRef } from "react";
import { Stage, Layer, Group } from "react-konva";
import { URLImage } from "./utils";
import DesignImageView from "./imageView";
import DesignTextView from "./textView";

const CanvasComponent = ({
    onChange,
    onSelect,
    selectedTransform,
    notebookDetails,
    book,
}) => {
    const stageRef = useRef();
    return (
        <>
            <Stage
                width={300}
                height={350}
                ref={stageRef}
                key={book.id}
            >
                <Layer  >
                    <Group>
                        <URLImage
                            src={book.url}
                            width={300}
                            height={350}
                            x={8}
                            y={0}
                            className="object-cover"
                        />
                        {
                            book?.designs?.map((design, index) => {
                                if (design.type === IMAGE) {
                                    return (
                                        <DesignImageView
                                            key={index}
                                            design={design}
                                            onChange={onChange}
                                            onSelect={onSelect}
                                            index={index}
                                            selectedTransform={selectedTransform}
                                        />
                                    );
                                } else {
                                    return (
                                        <DesignTextView
                                            key={index}
                                            design={design}
                                            onChange={onChange}
                                            onSelect={onSelect}
                                            index={index}
                                            selectedTransform={selectedTransform}
                                        />
                                    );
                                }
                            })
                        }
                    </Group>
                </Layer>
                {
                    notebookDetails?.specifications?.binding === SPIRAL && (
                        <Layer>
                            <URLImage
                                src={SPIRAL_IMAGE}
                                width={50}
                                x={-17}
                                height={370}
                                y={-10}
                            />
                        </Layer>
                    )
                }
            </Stage>
        </>
    )
}
export default CanvasComponent;
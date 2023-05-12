import { IMAGE } from "@/lib/constants";
import { Stage, Layer, Group, Text, Image } from "react-konva";
import { URLImage } from "./utils";
import { useEffect, useRef } from "react";
import useImage from "use-image";
import { toDataURL } from "@/lib/generatePDF";

const BookCanvas = ({
    book,
    width,
    height,
    isApplyCaptured = false,
    handleComplateIamgeCapturing,
    totalBooks,
    index,
    className
}) => {
    const stageRef = useRef();
    useEffect(() => {
        if (isApplyCaptured) {
            const dataURL = stageRef.current.toDataURL({
                pixelRatio: 10,
                quality: 1
            });
            book.previewURL = dataURL;
            if (totalBooks === index + 1) {
                handleComplateIamgeCapturing()
            }
        }
    }, [isApplyCaptured])
    return (
        <div className={className}>
            <Stage
                width={width}
                height={height}
                ref={stageRef}
            >
                <Layer  >
                    <Group>
                        <URLImage
                            src={book.url}
                            width={width}
                            height={height}
                            x={0}
                            y={0}
                            className="object-cover"
                        />
                        {
                            book?.designs?.map((design, index) => {
                                const scaleX = width / 300;
                                const scaleY = height / 350;

                                if (design.type === IMAGE) {
                                    return (
                                        <URLImage
                                            src={design.url}
                                            key={index}
                                            width={design.width * scaleX}
                                            height={design.height * scaleY}
                                            x={design.x * scaleX}
                                            y={design.y * scaleY}
                                            rotation={design.rotation || 0}
                                            className="object-cover"
                                        />
                                        // <Image
                                        //     key={index}
                                        //     image={toDataURL(design.url)}
                                        //     width={design.width * scaleX}
                                        //     height={design.height * scaleY}
                                        //     x={design.x * scaleX}
                                        //     y={design.y * scaleY}
                                        //     rotation={design.rotation || 0}

                                        // />
                                    );
                                } else {
                                    return (
                                        <Text
                                            key={index}
                                            text={design.text}
                                            fontSize={design.height * scaleY}
                                            x={(design.x - 8) * scaleX}
                                            y={design.y * scaleY}
                                            fill={design.color}
                                            lineHeight={1}
                                            rotation={design.rotation || 0}
                                            fontStyle="400"
                                        />
                                    );
                                }
                            })
                        }
                    </Group>
                </Layer>
            </Stage>
        </div>
    )
}
export default BookCanvas;
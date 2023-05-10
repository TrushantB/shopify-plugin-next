import { IMAGE, SPIRAL, SPIRAL_IMAGE } from "@/lib/constants";
import { useRef } from "react";
import { Stage, Layer, Group } from "react-konva";
import { URLImage } from "./utils";
import DesignImageView from "./imageView";
import DesignTextView from "./textView";

const CanvasComponent = ({
    bookForPurchase,
    onChange,
    onSelect,
    selectedTransform,
    notebookDetails,
    selectedNotebook,
    book,
    className,
    setBookForPurchase
}) => {
    const stageRef = useRef();
    const generatePreviewImage = () => {
        const dataURL = stageRef.current.toDataURL();
        bookForPurchase.map((bookItem) => {
            if (bookItem.id === selectedNotebook.id) {
                bookItem.previewURL = dataURL;
                return bookItem
            }
        });
        setBookForPurchase([...bookForPurchase]);
    }

    return (
        <>
            <Stage width={300} height={350} ref={stageRef} className={`${className}`} key={book.id}>
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
            <button className={className} onClick={generatePreviewImage}>DONE</button>
        </>
    )
}
export default CanvasComponent;
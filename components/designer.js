import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer, Group, Text } from "react-konva";

export class URLImage extends React.Component {
    state = {
        image: null,
    };
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image,
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    render() {
        return (
            <Image
                width={300}
                height={350}
                image={this.state.image}
                ref={(node) => {
                    this.imageNode = node;
                }}
            />
        );
    }
}


const Designer = ({ bookForPurchase, selectedNotebook, setSelectedNotebook }) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        if (bookForPurchase && bookForPurchase[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                bookForPurchase.length
            );

            setSelectedImageIndex(0);
        }
    }, [bookForPurchase]);

    const handleSelectedImageChange = (newIdx) => {
        if (bookForPurchase && bookForPurchase.length > 0) {
            setSelectedNotebook(bookForPurchase[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef?.current[newIdx]) {
                carouselItemsRef?.current[newIdx]?.scrollIntoView({
                    inline: "center",
                    behavior: "smooth"
                });
            }
        }
    };

    const handleRightClick = () => {
        if (bookForPurchase && bookForPurchase.length > 0) {
            let newIdx = selectedImageIndex + 1;
            if (newIdx >= bookForPurchase.length) {
                newIdx = 0;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    const handleLeftClick = () => {
        if (bookForPurchase && bookForPurchase.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = bookForPurchase.length - 1;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    return (
        <div className="w-1/2 bg-primary py-10 h-screen text-center">
            <div className="carousel-container">
                <div className="selected-image flex justify-center items-center">
                    <Stage
                        width={300}
                        height={350}
                    >
                        {
                            bookForPurchase.map((book) => {
                                if (selectedNotebook.id === book.id)
                                    return (
                                        <Layer>
                                            <Group>
                                                <URLImage src={book.url} />
                                            </Group>
                                        </Layer>

                                    )
                            })
                        }
                    </Stage>
                </div>
                <div className="carousel">
                    <div className="carousel__images">
                        {bookForPurchase &&
                            bookForPurchase.map((image, idx) => (
                                < div className="flex-row" key={idx}>
                                    <div
                                        onClick={() => handleSelectedImageChange(idx)}
                                        style={{ backgroundImage: `url(${image.url})` }}
                                        key={image.id}
                                        className={`carousel__image ${selectedNotebook.id === image.id && "carousel__image-selected"
                                            }`}
                                        ref={(el) => (carouselItemsRef.current[idx] = el)}
                                    />
                                    <span className="px-3 rounded-full text-white font-bold  bg-[#ffa700]">{idx + 1}</span>
                                </div>
                            ))}
                    </div>
                    <button
                        className="carousel__button carousel__button-left"
                        onClick={handleLeftClick}
                    >
                        Prev
                    </button>
                    <button
                        className="carousel__button carousel__button-right"
                        onClick={handleRightClick}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};



const DesignView = ({ isSelected, onSelect, tshirt, onChange, data }) => {
    const [image] = useImage(tshirt.preview, 'Anonymous');
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Image
                ref={shapeRef}
                isSelected={isSelected}
                image={image}
                draggable
                {...tshirt.positions}
                onClick={onSelect}
                onTap={onSelect}
                onDragStart={() => {
                    onChange({
                        ...data,
                        designs: {
                            ...data.designs,
                            [data.direction]: {
                                ...data.designs[data.direction],
                                positions: {
                                    ...data.designs[data.direction].positions,
                                    isDragging: true,
                                }
                            }
                        }
                    })
                }}
                onDragEnd={e => {
                    onChange({
                        ...data,
                        designs: {
                            ...data.designs,
                            [data.direction]: {
                                ...data.designs[data.direction],
                                positions: {
                                    ...data.designs[data.direction].positions,
                                    isDragging: false,
                                    x: e.target.x(),
                                    y: e.target.y(),
                                }
                            }
                        }
                    })
                }}
                onTransformEnd={e => {
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
                    onChange({
                        ...data,
                        designs: {
                            ...data.designs,
                            [data.direction]: {
                                ...data.designs[data.direction],
                                positions: {
                                    ...data.designs[data.direction].positions,
                                    x: node.x(),
                                    y: node.y(),
                                    // set minimal value
                                    width: Math.max(5, node.width() * scaleX),
                                    height: Math.max(node.height() * scaleY),
                                }
                            }
                        }
                    });
                }}
            />
            {isSelected && (
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

export default Designer;

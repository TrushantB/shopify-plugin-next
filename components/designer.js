import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer, Group, Text } from "react-konva";
import useImage from "use-image";
import front from './images/front.svg'

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
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            image: this.image,
        });
    };
    render() {
        return (
            <Image
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                image={this.state.image}
                ref={(node) => {
                    this.imageNode = node;
                }}
            />
        );
    }
}


const Designer = ({ bookForPurchase, selectedNotebook, setSelectedNotebook, handleApplyForAll, handleClearDesign, notebookDetails, setBookForPurchase }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const carouselItemsRef = useRef([]);
    const onSelect = () => {
        setIsSelected(!isSelected);
    }
    const onChange = (data, index) => {
        bookForPurchase.map((book) => {
            if (selectedNotebook.id === book.id) {
                book.designs[index] = data;
            }
        })
        setBookForPurchase([...bookForPurchase]);
    }



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
        <div className="w-1/2 bg-indigo-500  min-h-screen text-center">
            {/* <div onClick={handleClearDesign} className="text-white flex justify-end    cursor-pointer">
                <div className="bg-indigo-800 p-3 flex justify-center items-center flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>

                    <span >Design Back Cover</span>

                </div>
            </div> */}
            <div className="carousel-container">
                <div className="flex justify-center items-center">
                    <div onClick={handleApplyForAll} className="text-white flex justify-center items-center flex-col mx-3 bg-indigo-800 p-3 rounded cursor-pointer">
                        {
                            notebookDetails.isApplyForAll ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                </svg>

                        }
                        <span>{notebookDetails.isApplyForAll ? 'Applied For All' : 'Apply For All'}</span>
                    </div>
                    <div onClick={handleClearDesign} className="text-red-500 flex justify-center items-center flex-col  bg-indigo-800 p-3 rounded cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <span>Clear Design</span>
                    </div>
                </div>
                <div className="selected-image flex justify-center items-center">
                    <Stage
                        width={300}
                        height={350}
                    >
                        {
                            bookForPurchase.map((book) => {
                                if (selectedNotebook.id === book.id) {
                                    return (
                                        <Layer key={book.id}>
                                            <Group>
                                                <URLImage src={book.url} width={300} height={350} x={8} y={0} />
                                                {
                                                    book.designId == null &&
                                                    <URLImage src={`http://localhost:3000//${front.src}` || 'https://firebasestorage.googleapis.com/v0/b/myapp-281407.appspot.com/o/front.svg?alt=media&token=edaa5bac-f766-4327-baf5-2b65258dd6d6'} width={300} x={8} height={350} y={0} />
                                                }
                                                {
                                                    book.designs.map((design, index) => {
                                                        if (design.type === "image") {
                                                            return (
                                                                <DesignImageView
                                                                    key={index}
                                                                    design={design}
                                                                    onChange={onChange}
                                                                    onSelect={onSelect}
                                                                    isSelected={isSelected}
                                                                    index={index}
                                                                />
                                                            )
                                                        } else {
                                                            return (
                                                                <DesignTextView
                                                                    key={index}
                                                                    design={design}
                                                                    onChange={onChange}
                                                                    onSelect={onSelect}
                                                                    isSelected={isSelected}
                                                                    index={index}
                                                                />
                                                            )
                                                        }
                                                    })
                                                }

                                            </Group>
                                        </Layer>
                                    )

                                }
                            })
                        }

                        {
                            notebookDetails?.specifications?.binding === "spiral" &&
                            <Layer>
                                <URLImage src={'https://cdn.discordapp.com/attachments/885481565671542824/1068526514339061864/New_Project_3.png' || '@/public/spiral.png'} width={50} x={-17} height={370} y={-10} />
                            </Layer>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                    </button>
                    <button
                        className="carousel__button carousel__button-right"
                        onClick={handleRightClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};



const DesignImageView = ({ isSelected, onSelect, onChange, design, index }) => {
    const [image] = useImage(design.url, 'Anonymous');
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
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
                width={design.width}
                height={design.height}
                x={design.x}
                y={design.y}
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={e => {
                    const _design = {
                        ...design,
                        x: e.target.x(),
                        y: e.target.y(),
                    }
                    onChange(_design, index)
                }
                }
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
                    const _design = {
                        ...design,
                        x: e.target.x(),
                        y: e.target.y(),
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    }
                    onChange(_design, index);
                    // onChange({
                    //     ...data,
                    //     designs: {
                    //         ...data.designs,
                    //         [data.direction]: {
                    //             ...data.designs[data.direction],
                    //             positions: {
                    //                 ...data.designs[data.direction].positions,
                    //                 x: node.x(),
                    //                 y: node.y(),
                    //                 // set minimal value
                    //                 width: Math.max(5, node.width() * scaleX),
                    //                 height: Math.max(node.height() * scaleY),
                    //             }
                    //         }
                    //     }
                    // });
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
const DesignTextView = ({ isSelected, onSelect, onChange, design, index }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                ref={shapeRef}
                isSelected={isSelected}
                text={design.text}
                draggable
                width={design.width}
                fontSize={design.height}
                height={design.height}
                x={design.x}
                y={design.y}
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={e => {
                    const _design = {
                        ...design,
                        x: e.target.x(),
                        y: e.target.y(),
                    }
                    onChange(_design, index)
                }
                }
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
                    const _design = {
                        ...design,
                        x: e.target.x(),
                        y: e.target.y(),
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    }
                    onChange(_design, index);
                    // onChange({
                    //     ...data,
                    //     designs: {
                    //         ...data.designs,
                    //         [data.direction]: {
                    //             ...data.designs[data.direction],
                    //             positions: {
                    //                 ...data.designs[data.direction].positions,
                    //                 x: node.x(),
                    //                 y: node.y(),
                    //                 // set minimal value
                    //                 width: Math.max(5, node.width() * scaleX),
                    //                 height: Math.max(node.height() * scaleY),
                    //             }
                    //         }
                    //     }
                    // });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    enabledAnchors={[
                        'top-left',
                        'top-right',
                        'bottom-left',
                        'bottom-right',
                    ]}
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

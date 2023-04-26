import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer, Group, Text } from "react-konva";
import useImage from "use-image";
import { Html } from "react-konva-utils";
import Carousel from "better-react-carousel";
import Slider from "react-slick";
import { event } from "jquery";

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
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
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

const Designer = ({
  bookForPurchase,
  selectedNotebook,
  setSelectedNotebook,
  handleApplyForAll,
  handleAllClearDesign,
  handleClearDesign,
  notebookDetails,
  setBookForPurchase,
  target,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carouselItemsRef = useRef([]);
  // const [nav1, setNav1] = React.useState(null);
  // const [nav2, setNav2] = React.useState(null);
  let [index, setIndex] = useState(target);
  console.log("here is selected", index);
  // index = target;
  // let slider1 = [];
  // let slider2 = [];

  // useEffect(() => {
  //   setNav1(slider1);
  //   setNav2(slider2);
  // }, [slider1, slider2]);
  const onSelect = (event) => {
    console.log("yes here is me", event.target._id, bookForPurchase);
    setIsSelected(!isSelected);
  };
  const onChange = (data, index) => {
    bookForPurchase.map((book) => {
      if (selectedNotebook.id === book.id) {
        book.designs[index] = data;
      }
    });
    setBookForPurchase([...bookForPurchase]);
  };
  // useEffect(() => {
  //   const caroselSlick = document.getElementsByClassName("carousel");
  //   caroselSlick.slick("refresh");
  // }, []);
  // useEffect(() => {
  //   if (bookForPurchase && bookForPurchase[0]) {
  //     carouselItemsRef.current = carouselItemsRef.current.slice(
  //       0,
  //       bookForPurchase.length
  //     );

  //     setSelectedImageIndex(0);
  //   }
  // }, [bookForPurchase]);

  const handleSelectedImageChange = (newIdx) => {
    if (bookForPurchase && bookForPurchase.length > 0) {
      setSelectedNotebook(bookForPurchase[newIdx]);
      setSelectedImageIndex(newIdx);
    }
  };
  return (
    <div className=" bg-[#ffedc4]  pb-4 py-10  min-h-screen text-center">
      <div className="carousel-container">
        <div className="flex justify-center items-center"></div>

        {/* Notebook image div */}

        <div className="selected-image flex justify-center flex-col gap-10 items-center  ">
          <Stage width={300} height={350}>
            {bookForPurchase.map((book) => {
              if (selectedNotebook.id === book.id) {
                return (
                  <Layer key={book.id}>
                    <Group>
                      <URLImage
                        src={book.url}
                        width={300}
                        height={350}
                        x={8}
                        y={0}
                        className="object-cover"
                      />
                      {book.designId == null &&
                        !book.designs.length &&
                        notebookDetails?.specifications?.ruling === "ruled" && (
                          <URLImage
                            src={
                              "https://i.pinimg.com/originals/10/5a/fb/105afbfb1a012b3398ff35b54772f43f.png" ||
                              "@/public/spiral.png"
                            }
                            width={300}
                            x={8}
                            height={350}
                            y={0}
                            className="object-cover"
                          />
                        )}
                      {book.designs.map((design, index) => {
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
                          );
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
                          );
                        }
                      })}
                    </Group>
                  </Layer>
                );
              }
            })}

            {notebookDetails?.specifications?.binding === "spiral" && (
              <Layer>
                <URLImage
                  src={
                    "https://cdn.discordapp.com/attachments/885481565671542824/1068526514339061864/New_Project_3.png" ||
                    "@/public/spiral.png"
                  }
                  width={50}
                  x={-17}
                  height={370}
                  y={-10}
                />
              </Layer>
            )}
          </Stage>

          {/* apply clear all div */}
          <div className="flex flex-col flex-sm-row w-full h-14 justify-center gap-2 my-10   ">
            <div
              onClick={handleClearDesign}
              className="flex justify-center items-center flex-col mx-3  w-12/12 sm:w-4/12 p-3 rounded cursor-pointer border-2 border-[#0035ff]"
            >
              <span className="text-xl font-bold">CLEAR DESIGN</span>
            </div>

            {/* clear all design */}
            <div
              onClick={handleAllClearDesign}
              className=" flex justify-center items-center flex-col mx-3  w-12/12 sm:w-4/12 p-3 rounded cursor-pointer border-2 border-[#0035ff]"
            >
              <span className="text-xl font-bold">CLEAR ALL </span>
            </div>

            {/* apply for all */}
            <div
              onClick={handleApplyForAll}
              className="text-white flex justify-center items-center flex-col mx-3 bg-[#0035ff] p-3 w-12/12 sm:w-4/12 rounded cursor-pointer"
            >
              <span className="text-xl font-bold text-white">
                {notebookDetails.isApplyForAll
                  ? "Applied For All"
                  : "APPLY TO ALL"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <Slider
            className="pt-14 mx-lg-5 px-lg-4 px-0 mx-0 pt-lg-2 flex justify-center items-center carousel "
            focusOnSelect={true}
            initialSlide={target}
            // centerMode={true}
            variableWidth={true}
            slidesToShow={5}
            swipeToSlide={true}
            beforeChange={(prev, next) => {
              setIndex(next);
              handleSelectedImageChange(next);
            }}
            responsive={[
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 4,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
          >
            {bookForPurchase &&
              bookForPurchase.map((image, idx) => (
                <div className="relative  p-3.5" key={idx}>
                  {idx === index ? (
                    <>
                      <img
                        className="active  w-14 h-16 sm:w-24 sm:h-28 md:w-20 mx-auto md:h-28 object-cover flex justify-center items-center"
                        onClick={() => handleSelectedImageChange(idx)}
                        src={image.url}
                      />
                      <span className=" bg-blue-600 absolute left-0.5 top-1 py-0.5 px-1.5 ml-1 rounded-sm text-white text-bold inline-block z-10 text-xs ">
                        {idx + 1}
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        className=" w-14 h-16 sm:w-24 sm:h-28 md:w-20 mx-auto md:h-28 object-cover  flex justify-center border-slate-400 items-center border-dashed border-2"
                        onClick={() => handleSelectedImageChange(idx)}
                        src={image.url}
                      />
                      <span className="absolute left-1 top-1 py-0.5 px-1.5 ml-1 bg-zinc-400  rounded-sm text-white text-bold inline-block z-10 text-xs ">
                        {idx + 1}
                      </span>
                    </>
                  )}
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const DesignImageView = ({ isSelected, onSelect, onChange, design, index }) => {
  const [image] = useImage(design.url, "Anonymous");
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef?.current?.setNode(shapeRef.current);
      trRef?.current?.getLayer().batchDraw();
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
  const [editableText, setEditableText] = useState(true);
  const [inputValue, setInputValue] = useState(design.text);
  // const textFields = [];
  // textFields.push(design);
  console.log("designnnn", isSelected);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setEditableText(true);
    const _design = {
      ...design,
      text: inputValue,
    };
    onChange(_design, index);
  };
  const handleFocus = (event) => {
    event.target.setSelectionRange(inputValue.length, inputValue.length);
  };
  const handleClick = () => {
    console.log("handle click");
    setIsSelected(!isSelected);
  };

  React.useEffect(() => {
    if (isSelected) {
      console.log(shapeRef.current._id);
      trRef?.current?.setNode(shapeRef.current);
      trRef?.current?.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      {editableText ? (
        <Text
          ref={shapeRef}
          // isSelected={isSelected}
          text={design.text}
          // text="123123123"
          draggable
          width={design.width}
          // fontSize={5}
          fontSize={design.height}
          height={design.height}
          x={design.x}
          y={design.y}
          fill={design.color}
          onClick={onSelect}
          onTap={handleClick}
          onDblClick={() => setEditableText(false)}
          onDragEnd={(e) => {
            const _design = {
              ...design,
              x: e.target.x(),
              y: e.target.y(),
            };
            console.log("X", _design, index);
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
      ) : (
        <Html
          divProps={{
            style: {
              opacity: 1,
              position: "absolute",
              left: `${design.x}px`,
              top: `${design.y - 10}px`,
              border: 0,
              padding: 0,
              margin: 0,
              color: `${design.color}`,
            },
          }}
        >
          <textarea
            value={inputValue}
            className="bg-transparent border-transparent outline-none cursor-text"
            onChange={handleChange}
            // onKeyUp={handleKeyUp}
            autoFocus
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              fontSize: `${design.height}px`,
              // height: `${design.height}px`,
              width: "100%",
              resize: "none",
            }}
          />
        </Html>
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
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

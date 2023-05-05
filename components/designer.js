import React, { useEffect, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import DesignTextView from "./textView";
import DesignImageView from "./imageView";
import { URLImage } from "./utils";
import DesignAction from "./designAction";
import BookCarousel from "./bookCarousel";
import { IMAGE, SPIRAL, SPIRAL_IMAGE } from "@/lib/constants";

const Designer = ({
  bookForPurchase,
  selectedNotebook,
  setSelectedNotebook,
  handleApplyForAll,
  handleAllClearDesign,
  handleClearDesign,
  notebookDetails,
  setBookForPurchase,
}) => {
  const [selectedTransform, setSelectedTransform] = useState(null);

  const onSelect = (event, index) => {
    setSelectedTransform(index === selectedTransform ? null : index);
  };

  const onChange = (data, index) => {
    bookForPurchase.map((book) => {
      if (selectedNotebook.id === book.id) {
        book.designs[index] = data;
      }
    });
    setBookForPurchase([...bookForPurchase]);
  };

  const handleSelectedImageChange = (newIdx) => {
    setSelectedNotebook(bookForPurchase[newIdx]);
  };
  return (
    <div className=" bg-[#ffedc4]  pb-4 py-10  min-h-screen text-center">
      <div className="carousel-container">
        <div className="flex justify-center items-center"></div>
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
                      {book?.designs?.map((design, index) => {
                        if (design.type === IMAGE) {
                          return (
                            <DesignImageView
                              key={index}
                              design={design}
                              onChange={onChange}
                              onSelect={onSelect}
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
                              index={index}
                              selectedTransform={selectedTransform}
                            />
                          );
                        }
                      })}
                    </Group>
                  </Layer>
                );
              }
            })}
            {notebookDetails?.specifications?.binding === SPIRAL && (
              <Layer>
                <URLImage
                  src={SPIRAL_IMAGE}
                  width={50}
                  x={-17}
                  height={370}
                  y={-10}
                />
              </Layer>
            )}
          </Stage>

          <DesignAction
            handleClearDesign={handleClearDesign}
            handleAllClearDesign={handleAllClearDesign}
            handleApplyForAll={handleApplyForAll}
            notebookDetails={notebookDetails}
          />
        </div>

        <BookCarousel
          handleSelectedImageChange={handleSelectedImageChange}
          bookForPurchase={bookForPurchase}
          selectedNotebook={selectedNotebook}
        />
      </div>
    </div>
  );
};

export default Designer;

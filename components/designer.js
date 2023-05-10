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
  
  const handleDeleteSelected = ()=>{
    selectedNotebook.designs.splice(selectedTransform,1);
    setSelectedTransform(null);
  } 
  
  return (
    <div className=" bg-[#ffedc4]  pb-4 py-10  min-h-screen text-center">
      <div className="relative w-[300px] mx-auto pb-[5px]">
        {selectedTransform != null ? (<button className="absolute right-0 -top-4" onClick={handleDeleteSelected}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg></button>):(<></>)}
      </div>
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

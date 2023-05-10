import React, { useState } from "react";
import DesignAction from "./designAction";
import BookCarousel from "./bookCarousel";
import CanvasComponent from "./canvas";

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
    if (bookForPurchase && bookForPurchase.length > 0) {
      setSelectedNotebook(bookForPurchase[newIdx]);
    }
  };

  return (
    <div className=" bg-[#ffedc4]  pb-4 py-10  min-h-screen text-center">
      <div className="carousel-container">
        <div className="flex justify-center items-center"></div>
        <div className="selected-image flex justify-center flex-col gap-10 items-center  ">
          {
            bookForPurchase.map((book, index) => {
              return (
                <CanvasComponent
                  key={index}
                  bookForPurchase={bookForPurchase}
                  onChange={onChange}
                  onSelect={onSelect}
                  selectedTransform={selectedTransform}
                  notebookDetails={notebookDetails}
                  selectedNotebook={selectedNotebook}
                  book={book}
                  className={selectedNotebook?.id !== book.id ? 'd-none' : ''}
                  setBookForPurchase={setBookForPurchase}
                  setSelectedNotebook={setSelectedNotebook}
                />
              )

            })
          }
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

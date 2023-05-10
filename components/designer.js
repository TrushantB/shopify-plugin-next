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
    setSelectedNotebook({ ...selectedNotebook, updatedAt: new Date() })
    setBookForPurchase([...bookForPurchase]);
  };

  const handleSelectedNotebook = (newIdx) => {
    if (bookForPurchase && bookForPurchase.length > 0) {
      setSelectedNotebook(bookForPurchase[newIdx]);

      setTimeout(() => {
        setSelectedNotebook({ ...bookForPurchase[newIdx], updatedAt: new Date() })
      }, 1000);

    }
  };

  const handleDeleteSelected = () => {
    selectedNotebook.designs.splice(selectedTransform, 1);
    selectedNotebook.updatedAt = new Date();
    setSelectedTransform(null);
  }

  return (
    <div className=" bg-[#ffedc4] pt-4 min-h-screen text-center">
      {
        selectedTransform !== null &&
        <div className="relative w-[360px] mx-auto">
          <button className={`absolute right-0 -top-3 pt-4 h-6 w-6`} onClick={handleDeleteSelected}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          </button>
        </div>
      }
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
                  handleDeleteSelected={handleDeleteSelected}
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
          handleSelectedNotebook={handleSelectedNotebook}
          bookForPurchase={bookForPurchase}
          selectedNotebook={selectedNotebook}
        />
      </div>
    </div>
  );
};




export default Designer;

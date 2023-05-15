import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BookCanvas from "./bookCanvas";
const BookCarousel = ({
  handleSelectedNotebook,
  bookForPurchase,
  selectedNotebook,
}) => {
  const [initialSlide, setInitialSlide] = useState(null);
  const [selectedIndex,setSelectedIndex] = useState(0);
  useEffect(() => {
    if (initialSlide === null || initialSlide === -1) {
      setInitialSlide(
        bookForPurchase.findIndex((book) => book.id === selectedNotebook?.id)
      );
    }
  }, [selectedNotebook?.id, bookForPurchase, initialSlide]);

  return (
    <div >
      {initialSlide !== null && initialSlide !== -1 && (
        <Slider
          className="pt-14 mx-lg-5 px-0 mx-0  flex justify-center items-center carousel box-border "
          focusOnSelect={true}
          initialSlide={initialSlide || 0}
          // variableWidth={true}
          slidesToShow={5}
          swipeToSlide={true}
          beforeChange={(prev, next) => {
            handleSelectedNotebook(next);
            // setSelectedIndex(next);
          }}
          responsive={[
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {bookForPurchase &&
            bookForPurchase.map((book, idx) => (
              <div className="relative p-3.5 box-border"  key={idx}>
                <>
                {/* const className = {selectedIndex===idx ? 'active':'' } */}
                  <BookCanvas
                    book={book}
                    height={120}
                    width={90}
                    index={idx}
                    totalBooks={bookForPurchase.length}
                    handleComplateIamgeCapturing={() => { }}
                    isApplyCaptured={false}
                    className={`${book.id === selectedNotebook?.id ? "active": "border-dashed border-2 w-fit bg-zinc-400" }` }
                  />
                  <span
                    className={`${book.id === selectedNotebook?.id
                      ? "bg-blue-600"
                      : "bg-zinc-400"
                      }  absolute  left-[15%] top-[3%] md:left-[12%] lg:left-[5%] py-0.5 px-1.5 ml-1 rounded-sm text-white text-bold inline-block z-10 text-xs spanClass`}
                  >
                    {idx + 1}
                  </span>
                </>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};
export default BookCarousel;

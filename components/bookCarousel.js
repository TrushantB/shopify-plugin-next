import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BookCanvas from "./bookCanvas";
const BookCarousel = ({
  handleSelectedNotebook,
  bookForPurchase,
  selectedNotebook,
}) => {
  const [initialSlide, setInitialSlide] = useState(null);

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
          className="pt-14 mx-lg-5 px-lg-4 px-0 mx-0 pt-lg-2 flex justify-center items-center carousel "
          focusOnSelect={true}
          initialSlide={initialSlide || 0}
          // variableWidth={true}
          slidesToShow={5}
          swipeToSlide={true}
          beforeChange={(prev, next) => {
            handleSelectedNotebook(next);
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
            bookForPurchase.map((book, idx) => (
              <div className="relative  p-3.5" key={idx}>
                <>
                  <BookCanvas
                    book={book}
                    height={120}
                    width={100}
                    index={idx}
                    totalBooks={bookForPurchase.length}
                    handleComplateIamgeCapturing={() => { }}
                    isApplyCaptured={false}
                  />
                  <span
                    className={`${book.id === selectedNotebook?.id
                      ? "bg-blue-600"
                      : "bg-zinc-400"
                      }  absolute  left-[18%] top-[3%] lg:left-[5%] py-0.5 px-1.5 ml-1 rounded-sm text-white text-bold inline-block z-10 text-xs `}
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

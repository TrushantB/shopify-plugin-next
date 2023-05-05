import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
const BookCarousel = ({
  handleSelectedImageChange,
  bookForPurchase,
  selectedNotebook,
}) => {
  const [initialSlide, setInitialSlide] = useState(null);
  useEffect(() => {
    if (initialSlide === null || initialSlide === -1) {
      setInitialSlide(
        bookForPurchase.findIndex((book) => book.id === selectedNotebook.id)
      );
    }
  }, [selectedNotebook.id, bookForPurchase, initialSlide]);
  return (
    <div>
      {initialSlide !== null && initialSlide !== -1 && (
        <Slider
          className="pt-14 mx-lg-5 px-lg-4 px-0 mx-0 pt-lg-2 flex justify-center items-center carousel "
          focusOnSelect={true}
          initialSlide={initialSlide || 0}
          variableWidth={true}
          slidesToShow={5}
          swipeToSlide={true}
          beforeChange={(prev, next) => {
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
            bookForPurchase.map((book, idx) => (
              <div className="relative  p-3.5" key={idx}>
                <>
                  <img
                    className={`${
                      book.id === selectedNotebook?.id
                        ? "active"
                        : "border-slate-400 border-dashed border-2"
                    } w-14 h-16 sm:w-24 sm:h-28 md:w-20 mx-auto md:h-28 object-cover flex justify-center items-center`}
                    onClick={() => handleSelectedImageChange(book.id)}
                    src={book.url}
                  />
                  <span
                    className={`${
                      book.id === selectedNotebook?.id
                        ? "bg-blue-600"
                        : "bg-zinc-400"
                    }  absolute left-0.5 top-1 py-0.5 px-1.5 ml-1 rounded-sm text-white text-bold inline-block z-10 text-xs `}
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

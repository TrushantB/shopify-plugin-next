import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { default as NextImage } from "next/image";
import { ChromePicker } from "react-color";

export default function Editor({
  designTemplates,
  applyDesign,
  handleResult,
  notebookDetails,
  handleAddtext,
  handleTextColor,
  handleAddImage
}) {
  const [text, setText] = useState("");
  const router = useRouter();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState();
  const [fillColor, setFillColor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const defaultColor = ['#1c1c1c', '#ef4444', '#4d982c', '#420420', '#092c86'];

  const ref = useRef(null);
  const handleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  const handleChange = (color) => {
    setColor(color.hex);
    handleTextColor("", color.hex);
    setFillColor(true);
  };

  const handlePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" py-10 lg:py-0  flex items-center  justify-center">
      <div className="px-4  lg:px-10  h-full w-10/12 mx-auto ">
        <div className="flex items-center justify-center pb-10 gap-x-3 ">
          <div>
            <h5 className="flex justify-center items-center my-2 text-2xl lg:text-3xl font-bold text-gray-800">
              CUSTOMISE YOUR NOTEBOOK
            </h5>
          </div>

          <div className="relative">
            <svg
              className="w-6 h-6 font-normal cursor-pointer ispopover"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onMouseEnter={handlePopover}
              onMouseLeave={handlePopover}

            // ref={ref}
            // onClick={(event) => handleInfoClick(event)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            {isOpen ? (
              <div
                className="p-3 bg-cyan-100 text-sm popoverContainer absolute right-0 top-8 w-[400px]  ispopover"
              // style={{ display: "none" }}
              // ref={ref}
              >
                <h6 className="font-semibold  ispopover">
                  Terms And Conditions
                </h6>
                <ul className="pl-4 ispopover">
                  <li className="py-2 ispopover relative before:content-[''] before:block before:h-1.5 before:w-1.5 before:-left-4 before:top-4 before:rounded-full before:absolute before:bg-blue-500">
                    Image size should not exceed 10MB
                  </li>
                  <li className="py-2 ispopover relative before:content-[''] before:block before:h-1.5 before:w-1.5 before:-left-4 before:top-4 before:rounded-full before:absolute before:bg-blue-500">
                    Please avoid uploading images of celebrities, sports stars,
                    TV characters, cartoon characters or images for which you do
                    not own the copyrights.
                  </li>
                  <li className="py-2 ispopover relative before:content-[''] before:block before:h-1.5 before:w-1.5 before:-left-4 before:top-4 before:rounded-full before:absolute before:bg-blue-500">
                    Please ensure to resize the images as necessary to fit the
                    canvas. You can open the canvas & resize the image.
                  </li>
                  <li className="py-2 ispopover relative before:content-[''] before:block before:h-1.5 before:w-1.5 before:-left-4 before:top-4 before:rounded-full before:absolute before:bg-blue-500">
                    Please avoid placing any text too close to the border since
                    there are slight chances that it might get cut.
                  </li>
                  <li className="py-2 ispopover relative before:content-[''] before:block before:h-1.5 before:w-1.5 before:-left-4 before:top-4 before:rounded-full before:absolute before:bg-blue-500">
                    Please Check final preview to see if the designs are placed
                    as you wish.
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          className="flex border-2 border-[#fbc11c] border-dashed rounded text-white items-center justify-center text-center gap-2 p-1 cursor-pointer"
        // onClick={handleAddImage}
        >
          <div class="text-black p-2">
    <label for="file-input" className="flex items-center cursor-pointer text-xl">
        <img className="h-[30px] mr-3" alt="image" src="https://img.icons8.com/?size=512&id=RXegk50IKV5u&format=png"/>
        <span>UPLOAD YOUR IMAGE</span>
    </label>
    <input className="d-none" id="file-input" type="file" onChange={(event) => handleAddImage(event)}/>
</div>
        </div>
        <div>
          <label className="flex justify-center items-center uppercase tracking-wide text-gray-700 text-xl font-bold mb-2 pt-10">
            OR
          </label>
        </div>
        <div className="mb-2">
          <label className="flex justify-center items-center uppercase tracking-wide text-gray-700 text-xl font-bold mb-4 pt-2">
            PICK YOUR DESIGN TEMPLATE
          </label>
          <div className="grid gap-3 lg:gap-3 md:gap-5 grid-cols-2  md:grid-cols-5 overflow-y-auto h-[240px] scrollbar ">
            {designTemplates.map((design) => {
              return (
                <div
                  className=" w-[90px] h-28 "
                  onClick={() => applyDesign(design)}
                  key={design.id}
                >
                  <NextImage
                    src={design.url}
                    width={100}
                    height={75}
                    className="max-w-full h-full object-center object-cover cursor-pointer border-solid border-2  image-grid "
                    alt=""
                  />
                </div>
              );
            })}
          </div>

          <div className="grid   my-3 py-3 pt-4 ">
            <div className="mb-2 w-full">
              <div className="mb-2  flex items-center flex-col flex-sm-row ">
                <label className=" uppercase tracking-wide inline-block text-gray-700 text-xl font-bold lg:w-3/12 py-4 lg:py-0">
                  Add Text
                </label>
                <div className="flex flex-col flex-sm-row items-center gap-3 sm:gap-0  text-center w-9/12   ">
                  <input
                    type="text"
                    id="first_name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key == "Enter") {
                        handleAddtext(text);
                        setText("");
                      }
                    }}
                    className=" border border-gray-300 text-black text-sm   focus:ring-blue-500 rounded focus:border-blue-500 block w-full pt-3 pb-3 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-[120px]"
                    placeholder="Enter your text here"
                    required
                  />
                  <button
                    onClick={() => {
                      handleAddtext(text);
                      setText("");
                    }}
                    className="bg-[#fbb900]  py-[14px] text-black sm:-ml-[130px] w-full sm:w-[initial]  md:py-[14px] px-[41px] rounded text-xs md:text-base"
                  >
                    ADD
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center py-4">
                {defaultColor.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(event) => {
                        handleTextColor(event, color);
                        setColor(color);
                        setActiveColorIndex(index)
                      }}
                      className={`w-12 m-2 h-12 rounded-xl ${index == activeColorIndex ? 'activeColor' : ''}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  )
                })
                }
                <div className="flex flex-col">
                  {!fillColor ? (
                    <span onClick={handleColorPicker}>
                      <img
                        alt="img"
                        src="/images/gradent_color.webp"
                        className="mx-2 p-2 w-24"
                      />
                    </span>
                  ) : (
                    <div
                      className="mx-2 p-2 w-24 h-12 rounded-2xl my-2"
                      onClick={handleColorPicker}
                      style={{ background: color }}
                    ></div>
                  )}
                  {displayColorPicker ? (
                    <div style={popover}>
                      <div style={cover} onClick={handleClose} />

                      <ChromePicker color={color} onChange={handleChange} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-md-row items-center text-center gap-5 ">
              <button
                onClick={() => router.push("/specification")}
                className="w-3/4 md:w-1/2 border-2 font-bold  border-[#0035ff] p-3 rounded text-base md:text-xl "
              >
                GO BACK
              </button>
              <button
                onClick={handleResult}
                className="bg-[#0035ff] w-3/4 md:w-1/2 font-bold text-white p-3 rounded  md:text-xl text-base "
              >
                SAVE AND CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

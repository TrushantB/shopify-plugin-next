import React, { useState } from "react";
import { useRouter } from "next/router";
import { default as NextImage } from "next/image";
import { ChromePicker } from "react-color";
import { Popover, Whisper, Button } from "rsuite";
import Link from "next/link";

export default function Editor({
  designTemplates,
  applyDesign,
  handleResult,
  notebookDetails,
  handleAddtext,
  handleTextColor,
  handleAddImage,
}) {
  const [text, setText] = useState("");
  const router = useRouter();

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState();
  const [fillColor, setFillColor] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleColorPicker = () => {
    console.log("handleColorPicker");
    setDisplayColorPicker(!displayColorPicker);
  };
  // handleClick = () => {
  //   this.setState({ displayColorPicker: !this.state.displayColorPicker })
  // };

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
    // this.setState({ color: color.rgb })
    setColor(color.hex);
    console.log(color.hex);
    handleTextColor("", color.hex);
    setFillColor(true);
  };

  return (
    <div className=" py-10 lg:py-0 min-h-0 lg:min-h-screen flex items-center  justify-center ">
      <div className="px-4  lg:px-10  h-full w-10/12 mx-auto">
        <h5 className="flex justify-center items-center mb-2 text-2xl lg:text-3xl pb-10  font-bold text-gray-800">
          CUSTOMISE YOUR NOTEBOOK
        </h5>
        <div
          className="flex border-2 border-[#fbc11c] border-dashed rounded text-white items-center justify-center text-center gap-2 p-1 cursor-pointer"
          // onClick={handleAddImage}
        >
          <input
            className="text-black p-2 "
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => handleAddImage(event)}
          />
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
          <div className="grid gap-4 lg:gap-3 md:gap-5  grid-cols-2  md:grid-cols-5  ">
            {designTemplates.map((design) => {
              return (
                <div
                  className=" w-[90px] h-28"
                  onClick={() => applyDesign(design)}
                  key={design.id}
                >
                  <NextImage
                    src={design.url}
                    width={100}
                    height={75}
                    className="   cursor-pointer border-solid border-2  image-grid "
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid   my-3 py-3 pt-4 ">
          <div className="mb-2 w-full">
            <div className="mb-2  flex items-center flex-col flex-sm-row ">
              <label className=" uppercase tracking-wide inline-block text-gray-700 text-xl font-bold w-3/12 ">
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
                      console.log(e.key);
                      handleAddtext(text);
                      setText("");
                    }
                  }}
                  className=" border border-gray-300 text-black text-sm   focus:ring-blue-500 rounded focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Enter your text here"
                  required
                />
                <button
                  onClick={() => {
                    handleAddtext(text);
                    setText("");
                  }}
                  className="bg-[#fbb900]  py-3 text-black sm:-ml-[130px] w-full sm:w-[initial]  md:py-3 px-5 rounded text-xs md:text-base  "
                >
                  ADD
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center py-4">
              <div
                onClick={(event) => {
                  handleTextColor(event, "blue");
                  setColor("blue");
                }}
                className="w-12 m-2 h-12 bg-blue-900 "
              ></div>
              <div
                onClick={(event) => {
                  handleTextColor(event, "purple");
                  setColor("purple");
                }}
                className="w-12 m-2 h-12 bg-purple-900 "
              ></div>
              <div
                onClick={(event) => {
                  handleTextColor(event, "red");
                  setColor("red");
                }}
                className="w-12 m-2 h-12 bg-red-900 "
              ></div>
              <div
                onClick={(event) => {
                  handleTextColor(event, "green");
                  setColor("green");
                }}
                className="w-12 m-2 h-12 bg-green-900 "
              ></div>
              <div
                onClick={(event) => {
                  handleTextColor(event, "yellow");
                  setColor("yellow");
                }}
                className="w-12 m-2 h-12 bg-yellow-300 "
              ></div>
              <div className="flex flex-col">
                <button onClick={handleColorPicker}>Pick Color</button>
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
        </div>
        <div className="flex flex-col flex-md-row items-center text-center gap-5 ">
          <button
            // onClick={handleResult}
            // onClick={handleResult}
            // onClick={handleSaveAndContinue}
            className="w-3/4 md:w-1/2 border-2 font-bold  border-[#0035ff] p-3 rounded text-base md:text-xl "
          >
            GO BACK
          </button>
          <button
            // onClick={handleResult}
            // onClick={handleResult}
            onClick={handleResult}
            className="bg-[#0035ff] w-3/4 md:w-1/2 font-bold text-white p-3 rounded  md:text-xl text-base "
          >
            SAVE AND CONTINUE
          </button>
        </div>
      </div>

      <div className="bg-[#edf7fa] p-4 my-5 rounded">
            <h3 className=" text-xl font-semibold mb-4">Quick Tips</h3>
            <ul class="marker:text-[#0035ff] list-outside list-disc ml-6">
              <li>Image size should not exceed 10MB & video size should not exceed 100MB</li>
              <li> Please avoid uploading images of celebrities, sports stars, TV characters, cartoon characters or images for which you do not own the copyrights.</li>
              <li> Please ensure to resize the images as necessary to fit the canvas. You can open the canvas & resize the image.</li>
              <li> Please avoid placing any text too close to the border since there are slight chances that it might get cut.</li>
              <li>
              Please Check final preview to see if the designs are placed as you wish.
              </li>
            </ul>
          </div>
    </div>
  );
}

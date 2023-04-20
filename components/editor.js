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
  // const [fileUpload, setFileUpload] = React.useState({});
  // const [dlImage, setDLimage] = React.useState(false)

  // function chnageDirection(e) {
  //     tshirtOnChange({
  //         ...tshirt,
  //         direction: e.target.value
  //     })
  // }

  // function _designLabel(val, direction) {
  //     let setVal = val
  //     let dl_front = document.getElementById("dl_front")
  //     let dl_back = document.getElementById("dl_back")
  //     if (setVal === null) {
  //         if (direction === 'front') {
  //             setVal = "Front Design"
  //         } else {
  //             setVal = "Back Design"
  //         }
  //     }

  //     if (direction === 'front') {
  //         dl_front.innerHTML = setVal
  //     } else {
  //         dl_back.innerHTML = setVal
  //     }
  // }

  // function changeDesign(e) {
  //     const file = e.target.files[0]
  //     console.log(file.name)
  //     const input_name = e.target.name
  //     const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg']

  //     // check is file an image
  //     if (file && acceptedImageTypes.includes(file['type'])) {
  //         const design = URL.createObjectURL(file)
  //         // set label image
  //         _designLabel(file.name, input_name)

  //         // Get image width
  //         let img = new Image();
  //         img.src = design
  //         img.onload = function () {
  //             // console.log(canvas_width)
  //             // console.log(this.width + " " + this.height);
  //             setFileUpload({
  //                 stream: design,
  //                 direction: input_name,
  //                 width: this.width,
  //                 height: this.height
  //             })
  //         };
  //     } else {
  //         // console.log('anajay bukan gambar')
  //         setModal({
  //             isOpen: true,
  //             message: 'Please upload an image file (jpg, jpeg, png)'
  //         })
  //         e.target.value = null
  //     }
  // }

  // React.useEffect(() => {
  //     function _calculate_image_size(type, originalWidth, originalHeight) {
  //         const canvas = Math.round(40 * elStage.current.clientWidth / 100)

  //         if (originalWidth >= canvas) {
  //             const maxWidth = canvas
  //             const maxHeight = Math.round(55 * elStage.current.clientWidth / 100)
  //             var ratio = 0;  // Used for aspect ratio
  //             var width = originalWidth;    // Current image width
  //             var height = originalHeight;  // Current image height

  //             let newWidth = maxWidth;
  //             let newHeight = maxWidth;

  //             if (width > maxWidth && width > height) {
  //                 ratio = width / height;
  //                 newHeight = maxWidth / ratio;
  //                 newWidth = maxWidth

  //             } else if (height > maxHeight && height > width) {
  //                 ratio = height / width;
  //                 newWidth = maxHeight / ratio
  //                 newHeight = maxHeight;
  //             }

  //             if (type === 'width') {
  //                 return newWidth
  //             } else {
  //                 return newHeight
  //             }
  //         }
  //         return originalWidth
  //     }

  //     if (Object.keys(fileUpload).length > 0) {
  //         tshirtOnChange({
  //             ...tshirt,
  //             designs: {
  //                 ...tshirt.designs,
  //                 [fileUpload.direction]: {
  //                     ...tshirt.designs[fileUpload.direction],
  //                     preview: fileUpload.stream,
  //                     positions: {
  //                         ...tshirt.designs[fileUpload.direction].positions,
  //                         width: _calculate_image_size('width', fileUpload.width, fileUpload.width),
  //                         height: _calculate_image_size('height', fileUpload.width, fileUpload.height)
  //                     }
  //                 }
  //             }
  //         })

  //         setFileUpload({})
  //     }
  // }, [fileUpload, tshirt, tshirtOnChange, elStage])

  // const downloadURI = (uri, name) => {
  //     const link = document.createElement("a");
  //     link.download = name;
  //     link.href = uri;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  // };

  // React.useEffect(() => {
  //     if (dlImage && !selected) {
  //         saveImage()
  //         setDLimage(false)
  //     }

  //     function saveImage() {
  //         let element = document.getElementById("myDesign")
  //         const windowW = window.innerWidth
  //         if (windowW < 1024) {
  //             element.style.position = "fixed"
  //             element.style.zIndex = 999
  //             element.style.left = 0
  //         }

  //         html2canvas(element, {
  //             allowTaint: true,
  //             removeContainer: false,
  //             backgroundColor: null
  //         }).then(canvas => {
  //             if (windowW < 1024) {
  //                 element.style.position = null
  //                 element.style.zIndex = null
  //                 element.style.left = null
  //             }
  //             downloadURI(canvas.toDataURL('image/png'), 'tes')
  //             // document.body.appendChild(canvas);
  //         })
  //     }

  // }, [dlImage, setDLimage, selected])

  // React.useEffect(() => {
  //     console.log('editor loaded')
  // }, [])
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
  // const handleSaveAndContinue = () => {
  //   router.push("/finalpreviews");
  // };
  // const handleTextColor = (event) => {
  //   if (event.target.classList.contains("bg-blue-900")) {
  //     console.log("blue");
  //     setColor("blue");
  //   }
  //   if (event.target.classList.contains("bg-black")) {
  //     console.log("black");
  //     setColor("black");

  //   }
  //   if (event.target.classList.contains("bg-red-900")) {
  //     console.log("red");
  //     setColor("red");

  //   }
  //   if (event.target.classList.contains("bg-green-900")) {
  //     setColor("green");
  //     console.log("green");
  //   }
  //   if (event.target.classList.contains("bg-yellow-300")) {
  //     setColor("yellow");
  //     console.log("yellow");
  //   }
  // };
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
        {/* <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg> */}
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
              <div className=" w-[90px] h-28" onClick={() => applyDesign(design)} key={design.id}>
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
      {/* <div className="mb-5">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Directon
                  </label>
                  <div className="relative">
                      <select onChange={chnageDirection} className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="direction">
                          <option value="front">Front</option>
                          <option value="back">Back</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                  </div>
              </div> */}
      {/* <div className="mb-10">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Designs
                  </label>
                  <label className="w-full block cursor-pointer mb-3 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" htmlFor="d_front">
                      <span className="truncate block" id="dl_front">Front Design</span>
                      <input id="d_front" onChange={changeDesign} className="w-full hidden" type="file" name="front" />
                  </label>
                  <label className="w-full block cursor-pointer mb-3 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" htmlFor="d_back">
                      <span className="truncate block" id="dl_back">Back Design</span>
                      <input id="d_back" onChange={changeDesign} className="w-full hidden" type="file" name="back" />
                  </label>
              </div> */}
              {/* add text input */}


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
            {/* <span onClick={handleColorPicker}>
              <img
                alt="img"
                src="/images/gradent_color.webp"
                className="mx-2 p-2 w-24"
              />
              <ChromePicker />
            </span>   */}
          </div>  
        </div>
       {/* <div className="mb-2 col-span-1">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Add Image On Notebook
          </label>
          <div
            className="flex bg-indigo-500 text-white items-center justify-center text-center gap-2 p-1 cursor-pointer"
             onClick={handleAddImage}
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => handleAddImage(event)}
            />
          </div>
        </div>  */}
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
  </div>
  );
}

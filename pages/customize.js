import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FadeLoader } from "react-spinners";
const sampleImage =
  "http://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-square-1.jpg";

const Designer = dynamic(() => import("@/components/designer"), {
  ssr: false,
});
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
import { designTemplates } from "@/lib/constants";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

function Customize() {
  const router = useRouter();
  const [notebookDetails, setNotebookDetails] = useState({});
  const [selectedNotebook, setSelectedNotebook] = React.useState({});
  const [color, setColor] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // useEffect(() => {
  //   if (isSave) {
  //     window.addEventListener("beforeunload", (ev) => {
  //       ev.preventDefault();
  //       ev.returnValue = "Are you sure you want to close?";
  //     });
  //   }
  //   // return () => {
  //   window.removeEventListener("beforeunload", () => {
  //     console.log("called 2");
  //   });
  //   // };
  // }, [isSave]);
  // useEffect(() => {
  //   if (!isSave) {
  //     window.removeEventListener("beforeunload", () => {
  //       console.log("called 2");
  //     });
  //   }
  // return () => {
  //   second
  // }
  // }, [isSave]);

  // const beforeUnloadListener = (event) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  // };

  // // A function that invokes a callback when the page has unsaved changes.
  //   window.addEventListener("beforeunload", beforeUnloadListener);
  // };

  // // A function that invokes a callback when the page's unsaved changes are resolved.
  //   alert("saved");
  //   window.removeEventListener("beforeunload", beforeUnloadListener);
  // };

  // const [modal, setModal] = React.useState({
  //     isOpen: false,
  //     message: 'anjay'
  // })
  const [bookForPurchase, setBookForPurchase] = useState([]);
  const handleAddtext = (text) => {
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        const design = {
          type: "text",
          isDragging: false,
          width: 300 / 3,
          x: 300 / 2 - 300 / 3 / 2,
          y: 350 / 2 - 350 / 3 / 2,
          url: "",
          height: 350 / 15,
          text: text,
          color: color,
          isSelected: false,
        };
        book.designs.push(design);
        // console.log("===>", design);
        setSelectedNotebook({ ...selectedNotebook });
      }
    });
    setIsSave(true);
  };
  const handleTextColor = (event, param) => {
    // if (event.target.classList.contains("bg-blue-900")) {
    //   console.log("blue");
    //   console.log(param);
    //   setColor("blue");
    // }
    // if (event.target.classList.contains("bg-purple-900")) {
    //   console.log("black");
    //   setColor("purple");
    // }
    // if (event.target.classList.contains("bg-red-900")) {
    //   console.log("red");
    //   setColor("red");
    // }
    // if (event.target.classList.contains("bg-green-900")) {
    //   setColor("green");
    //   console.log("green");
    // }
    // if (event.target.classList.contains("bg-yellow-300")) {
    //   setColor("yellow");
    //   console.log("yellow");
    // }
    // console.log("here", param);
    setColor(param);
  };
  const handleAddImage = async (event) => {
    await setImage(URL.createObjectURL(event.target.files[0]));
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        const design = {
          type: "image",
          isDragging: false,
          width: 300 / 3,
          height: 350 / 3,
          x: 100,
          y: 100,
          url: URL.createObjectURL(event.target.files[0]),
        };
        book.designs.push(design);
        setSelectedNotebook({ ...selectedNotebook });
        setIsSave(true);
      }
    });
  };
  useEffect(() => {
    const notebookDetails = JSON.parse(
      sessionStorage.getItem("notebookDetails")
    );
    setNotebookDetails(notebookDetails);
    if (Number(notebookDetails?.specifications?.quantity)) {
      const bookSet = Array.from(
        Array(Number(notebookDetails.specifications.quantity)).keys(
          Number(notebookDetails.specifications.quantity)
        )
      ).map((id) => ({
        id,
        url: sampleImage,
        isCustomizedDesign: true,
        designId: null,
        designs: [],
      }));

      setBookForPurchase(bookSet);
      setSelectedNotebook(bookSet[0]);
    } else {
      router.push("/specification");
    }
  }, []);

  // React.useEffect(() => {
  //   // console.log(tshirt)
  // }, [])

  // const checkDeselect = e => {
  //     // deselect when clicked on empty area
  //     const clickedOnEmpty = e.target === e.target.getStage();
  //     if (clickedOnEmpty) {
  //         setSelected(false);
  //     }
  // };

  // function closeModal() {
  //     setModal({
  //         isOpen: false,
  //         message: null
  //     })
  // }

  // React.useEffect(() => {
  //     if (!appLoaded) {
  //         // preload images
  //         for (let i = 0; i < tshirts.length; i++) {
  //             const pic = tshirts[i];
  //             const image = new Image()
  //             image.src = pic
  //             image.onload = () => {
  //                 // hide loading when the last image has been loaded
  //                 if (i === (tshirts.length - 1)) {
  //                     setAppLoaded(true)
  //                     let fisrtLoad = document.getElementById("fisrtLoad")
  //                     fisrtLoad.classList.add("fade-out")
  //                     setTimeout(() => {
  //                         fisrtLoad.style.display = "none"
  //                     }, 500)
  //                 }
  //             }

  //         }
  //     }
  // }, [appLoaded, setAppLoaded])
  const applyDesign = (bookDesign) => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        book.url = bookDesign.url;
        book.designId = bookDesign.id;
        book.isCustomizedDesign = false;
        setSelectedNotebook({
          ...selectedNotebook,
          url: bookDesign.url,
          designId: bookDesign.id,
          isCustomizedDesign: false,
        });
        setIsSave(true);
      }
    });
    setBookForPurchase([...bookForPurchase]);
  };

  const handleApplyForAll = () => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: true });
    bookForPurchase.map((book) => {
      book.url = selectedNotebook.url;
      book.designId = selectedNotebook.designId;
      book.isCustomizedDesign = selectedNotebook.isCustomizedDesign;
      book.designs = selectedNotebook.designs;
    });
    setIsSave(true);
  };
  const handleClearDesign = () => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        book.url = sampleImage;
        book.designId = null;
        book.isCustomizedDesign = true;
        book.designs = [];
        setSelectedNotebook({
          ...selectedNotebook,
          url: sampleImage,
          designId: null,
          isCustomizedDesign: false,
          designs: [],
        });
      }
    });
  };
  const handleAllClearDesign = async () => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      book.url = sampleImage;
      book.designId = null;
      book.isCustomizedDesign = true;
      book.designs = [];
      setSelectedNotebook({
        ...selectedNotebook,
        url: sampleImage,
        designId: null,
        isCustomizedDesign: false,
        designs: [],
      });
    });
    setIsSave(false);
    // window.removeEventListener(
    //   "beforeunload",
    //   () => {
    //     alert("called 2");
    //   },
    //   false
    // );
  };

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  const handleResult = async () => {
    const resultNotebook = [];
    const { quantity, ...rest } = notebookDetails.specifications;
    let result = {
      product_id: generateString(14),
      isAgreeTermsAndConditions: notebookDetails.isAgreeTermsAndConditions,
      isDesignApplyForAll: notebookDetails.isApplyForAll,
      resultNotebook: resultNotebook,
      quantity: Number(quantity),
    };
    if (notebookDetails.isApplyForAll) {
      result.designId = selectedNotebook.designId;
      result.resultNotebook.push({
        designId: selectedNotebook.designId,
        url: selectedNotebook.url,
        ...rest,
      });
    } else {
      bookForPurchase.map((book) => {
        resultNotebook.push({
          id: book.id,
          designId: book.designId,
          url: book.url,
          ...rest,
        });
      });
      result.resultNotebook = resultNotebook;
    }
    // const add_to_product_data = {
    //   product: {
    //     title: "Custom Book",
    //     properties: resultNotebook,
    //     quantity: result.quantity,
    //     status: "active",
    //     vendor: "navneet",
    //     product_type: "customised",
    //     product_type: "Snowboard",
    //   },
    // };

    console.log("your result is here---===>", result);
    // try {
    //   const cookies = document.cookie.split("; ");
    //   const cartId = cookies.filter(
    //     (element) => element.substring(0, 4) === "cart"
    //   );
    //   // console.log("cart===>", cartId);
    //   // console.log("cookies== geexu>", document.cookie);

    //   setLoading(true);
    //   if (cartId.length !== 0) {
    //     fetch(
    //       `https://shopify-backend-x0gg.onrender.com/cart?cart=${cartId[0]}`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify(add_to_product_data),
    //       }
    //     ).then((resp) => {
    //       console.log("response", resp);
    //       if (resp.status === 200) {
    //         window.location.replace("https://ekartbook.myshopify.com/cart");
    //         setLoading(false);
    //         setIsSave(false);
    //       }
    //     });
    //   } else {
    //     alert("invalid Cart ID");
    //   }
    // } catch (err) {
    //   console.log("Error is here", err);
    // }
    const serializedData = serialize(result);
    router.push(`/finalpreviews?data=${encodeURIComponent(serializedData)}`);
  };
  const serialize = (obj) => {
    const cache = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "function") {
        return value.toString();
      } else if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return "[Circular]";
        }
        cache.add(value);
      }
      return value;
    });
  };
  return (
    <React.Fragment>
      <Header />
      {!loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Designer
            selectedNotebook={selectedNotebook}
            setSelectedNotebook={setSelectedNotebook}
            bookForPurchase={bookForPurchase}
            handleApplyForAll={handleApplyForAll}
            handleClearDesign={handleClearDesign}
            handleAllClearDesign={handleAllClearDesign}
            notebookDetails={notebookDetails}
            setBookForPurchase={setBookForPurchase}
          />
          <Editor
            designTemplates={designTemplates}
            applyDesign={applyDesign}
            handleResult={handleResult}
            notebookDetails={notebookDetails}
            handleAddtext={handleAddtext}
            handleAddImage={handleAddImage}
            handleTextColor={handleTextColor}
          />
        </div>
      ) : (
        <div className="w-auto h-auto flex items-center justify-center">
          <FadeLoader
            color="#36d7b7"
            height={18}
            loading
            margin={13}
            radius={0}
            width={3}
          />
          <h3>Adding product to cart</h3>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default Customize;

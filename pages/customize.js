import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
  const [image, setImage] = useState();
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
        };
        book.designs.push(design);
        setSelectedNotebook({ ...selectedNotebook });
      }
    });
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
  const handleAllClearDesign = () => {
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
    const add_to_cart_data = {
      product: {
        title: "Work Done",
        vendor: "Burton",
        product_type: "Snowboard",
        status: "active",
      },
    };
    await fetch("https://ekartbook.myshopify.com/cart/add.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "_cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _s=1ffb9963-b7af-4c44-8f39-f97a6e1084cc; _shopify_s=1ffb9963-b7af-4c44-8f39-f97a6e1084cc; _shopify_y=a8cd7c12-cf1d-4017-b630-a35366b87981; _y=a8cd7c12-cf1d-4017-b630-a35366b87981; cart=bfb0b3947f50a724db51c5ac4838e17c; cart_currency=INR; cart_sig=f2c451151e2818f2db8d3adb6e62b60a; cart_ts=1678175473; cart_ver=gcp-us-east1%3A1; secure_customer_sig=",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify(add_to_cart_data),
    }).catch((error) => {
      console.log("post error", error);
    });
    // localStorage.setItem("result", JSON.stringify(result));
    // const add_to_cart_data = await {
    //   product_id: result.product_id,
    //   quantity: result.quantity,
    //   thumbnail: result.resultNotebook[0].url,
    // };
    // console.log({ result });
    // console.log({ add_to_cart_data });
    // fetch("https://ekartbook.myshopify.com/cart/add.json", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ add_to_cart_data }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  return (
    <React.Fragment>
      <Header />
      <div className="  grid grid-cols-1 lg:grid-cols-2   ">
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
        />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Customize;

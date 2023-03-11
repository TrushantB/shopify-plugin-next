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
        title: "dummy data",
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
          "_ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=/?_ab=0&_fd=0&_sc=1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1;_s=69fe8cf0-2437-4207-9b70-20f4c4a95906; _shopify_s=69fe8cf0-2437-4207-9b70-20f4c4a95906; _shopify_sa_p=; cart=c465e57728cbe4931b8dc23e40983988; cart_ts=1678531247; cart_sig=4b654c005784c8fede54fce5457f08d9; cart_ver=gcp-us-east1:1; _shopify_sa_t=2023-03-11T10:47:26.522Z; keep_alive=1feac86f-4e45-4ab8-a6e8-0b810c194a46identity-state%3DBAhbAA%253D%253D--db43e3715865ca03e3123219ec91e34189be9380%3B%20_ab%3D1%3B%20__ssid%3D9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99%3B%20secure_customer_sig%3D%3B%20localization%3DIN%3B%20_orig_referrer%3D%3B%20_landing_page%3D%252F%253F_ab%253D0%2526_fd%253D0%2526_sc%253D1%3B%20_y%3D2c66f8db-3806-4014-ae91-84b77ba09a27%3B%20_shopify_y%3D2c66f8db-3806-4014-ae91-84b77ba09a27%3B%20cart%3D73054294073339d565aa1769c4fdfa5c%3B%20_abv%3D0%3B%20storefront_digest%3D34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1%3B%20cart_ts%3D1678453915%3B%20cart_sig%3Dcfc197930dace485078f58a500ee769c%3B%20cart_ver%3Dgcp-us-east1%253A3%3B%20ProductInventory--selected-location%3D%255B%257B%2522name%2522%253A%2522pune%2522%252C%2522id%2522%253A%2522gid%253A%252F%252Fshopify%252FLocation%252F78958952740%2522%257D%255D%3B%20_s%3D28165b10-5328-4790-a0f9-b8793593be59%3B%20_shopify_s%3D28165b10-5328-4790-a0f9-b8793593be59%3B%20_shopify_sa_p%3D%3B%20Order--selected-location%3D%255B%257B%2522id%2522%253A%2522MULTILOCATION_ALL_LOCATIONS_KEY%2522%252C%2522name%2522%253A%2522All%2520locations%2522%252C%2522fulfillmentServiceType%2522%253Anull%257D%255D%3B%20_shopify_sa_t%3D2023-03-10T18%253A21%253A14.974Z%3B%20keep_alive%3Ddc602bd6-6ab0-4358-840a-fa1dc5086785",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify({
        id: 44643287630116,
        quantity: 1,
      }),
    }).catch((error) => {
      console.log("post error", error);
    });
    // await fetch(
    //   "https://ekartbook.myshopify.com/admin/api/2023-01/products.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Cookie:
    //         "_shopify_y=a8cd7c12-cf1d-4017-b630-a35366b87981; _y=a8cd7c12-cf1d-4017-b630-a35366b87981; secure_customer_sig=",
    //       "X-Shopify-Access-Token": "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",
    //     },
    //     body: JSON.stringify(add_to_cart_data),
    //   }
    // ).catch((error) => {
    //   console.log("post error", error);
    // });

    // await fetch("https://ekartbook.myshopify.com/cart/add.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Cookie:
    //       "identity-state=BAhbAA%3D%3D--db43e3715865ca03e3123219ec91e34189be9380; _ab=1; __ssid=9e2f6d29-693f-49dd-9a8c-6e2d1a9bad99; secure_customer_sig=; localization=IN; _orig_referrer=; _landing_page=%2F%3F_ab%3D0%26_fd%3D0%26_sc%3D1; _y=2c66f8db-3806-4014-ae91-84b77ba09a27; _shopify_y=2c66f8db-3806-4014-ae91-84b77ba09a27; cart=73054294073339d565aa1769c4fdfa5c; _abv=0; storefront_digest=34ffa47c8b7fc2a09b1018acec1ea578cfaece25bc91d280c9fe60f9155b5ae1; cart_ts=1678453915; cart_sig=cfc197930dace485078f58a500ee769c; cart_ver=gcp-us-east1%3A3; ProductInventory--selected-location=%5B%7B%22name%22%3A%22pune%22%2C%22id%22%3A%22gid%3A%2F%2Fshopify%2FLocation%2F78958952740%22%7D%5D; _s=28165b10-5328-4790-a0f9-b8793593be59; _shopify_s=28165b10-5328-4790-a0f9-b8793593be59; _shopify_sa_p=; Order--selected-location=%5B%7B%22id%22%3A%22MULTILOCATION_ALL_LOCATIONS_KEY%22%2C%22name%22%3A%22All%20locations%22%2C%22fulfillmentServiceType%22%3Anull%7D%5D; _shopify_sa_t=2023-03-10T18%3A21%3A14.974Z; keep_alive=dc602bd6-6ab0-4358-840a-fa1dc5086785",
    //     "X-Shopify-Access-Token": "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",
    //   },
    //   body: JSON.stringify(add_to_cart_data),
    // }).catch((error) => {
    //   console.log("post error", error);
    // });

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

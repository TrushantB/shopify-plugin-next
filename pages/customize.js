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
        id: 819527155741212,
        title: "Burton Custom Freestyle 151",
        body_html: "<strong>Good snowboard!</strong>",
        vendor: "Burton",
        product_type: "Snowboard",
        created_at: "2023-03-10T14:59:51+05:30",
        handle: "burton-custom-freestyle-152",
        updated_at: "2023-03-10T14:59:51+05:30",
        published_at: null,
        template_suffix: null,
        status: "draft",
        published_scope: "web",
        tags: "",
        admin_graphql_api_id: "gid://shopify/Product/8195271557412",
        variants: [
          {
            id: 44804397629732,
            product_id: 8195271557412,
            title: "Default Title",
            price: "0.00",
            sku: "",
            position: 1,
            inventory_policy: "deny",
            compare_at_price: null,
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Default Title",
            option2: null,
            option3: null,
            created_at: "2023-03-10T14:59:51+05:30",
            updated_at: "2023-03-10T14:59:51+05:30",
            taxable: true,
            barcode: null,
            grams: 0,
            image_id: null,
            weight: 0.0,
            weight_unit: "kg",
            inventory_item_id: 46853421596964,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/44804397629732",
          },
        ],
        options: [
          {
            id: 10399665160484,
            product_id: 8195271557412,
            name: "Title",
            position: 1,
            values: ["Default Title"],
          },
        ],
        images: [],
        image: null,
      },
    };
    fetch("https://ekartbook.myshopify.com/admin/api/2023-01/products.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": "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",
      },
      body: JSON.stringify(add_to_cart_data),
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

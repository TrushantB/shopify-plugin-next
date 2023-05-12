import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { createPDF } from "@/lib/generatePDF";
import firebase from '../lib/firebase.js'
import BookCanvas from "./bookCanvas.js";
const FinalPreview = (props) => {
  const [flag, setFlag] = useState(false);
  let [result, setResult] = useState({});
  let [count, setCount] = useState();
  let [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [isApplyCaptured, setIsApplyCaptured] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("result"));
    const notebookDetails = JSON.parse(sessionStorage.getItem("notebookDetails"));
    setResult({ ...data.result, specifications: notebookDetails.specifications });
    setCount(data.result.quantity);
    let count = 0;
    data.result.resultNotebook.map((item) => {
      if (item.designId === null) {
        setFlag(true);
      } else {
        setSelected(++count);
      }
    });
  }, []);

  const handleModifyDesign = (event, id) => {
    sessionStorage.setItem(
      "selectedId",
      JSON.stringify({ selectedNotebook: id })
    );
    router.push({ pathname: "/customize" });
  };
  const handleCloseButton = (id) => {
    sessionStorage.setItem(
      "selectedId",
      JSON.stringify({ selectedNotebook: id })
    );
    router.push(`/customize`);
  };

  const handleComplateIamgeCapturing = async () => {
    setIsApplyCaptured(false);
    handleGeneratePDF();
    const add_to_product_data = {
      product: {
        title: "Navneet Custom Book",
        properties: [],
        quantity: result.quantity,
        status: "active",
        vendor: "navneet",
        product_type: "customised",
        "variants": [
          {
            "title": "Navneet book",
            "price": "50.00",
            "position": 1,
            "inventory_quantity": 1,
          },
        ],
      },
    };
    try {
      const cookies = document.cookie.split("; ");
      let count_item;
      let quantity = parseInt(add_to_product_data.product.quantity);
      const cartId = cookies.filter(
        (element) => element.substring(0, 4) === "cart"
      );
      if (cartId.length !== 0) {
        await fetch(`https://navneetbackend.geexu.org/cart/count?${cartId[0]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((resp) => resp.json())
          .then((result) => {
            count_item = result.item_count;
          });
        const cartProduct = count_item + quantity;
        if (cartProduct <= 100) {
          fetch(`https://navneetbackend.geexu.org/cart/add?${cartId[0]}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(add_to_product_data),
          }).then(async (resp) => {
            if (resp.status === 200) {
              window.location.replace("https://navneet.geexu.org/cart");
              setLoading(false);
              toast.success('Product successfully added');
            }
          });
        } else {
          setLoading(false);
          setFlag(false)
          toast.error('Cart can not store more than 100 products');
        }
      } else {
        setLoading(false);
        setFlag(false)
        toast.error('Invalid cart');
      }
    } catch (err) {
    }
  }

  const handleAddToCartButton = async () => {
    setLoading(true)
    setFlag(true);

  };
  useEffect(() => {
    if (loading) {
      setIsApplyCaptured(true);
    }
  }, [loading])

  const sendMail = async (url) => {
    const response = await fetch("/api/sendgrid", {
      method: "POST",
      body: JSON.stringify({ url })
    });
    const jsonData = await response.json();
  }

  const handleGeneratePDF = async () => {
    const file = await createPDF(result);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child("customize-book.pdf");

    fileRef.put(file).then((snapshot) => {
      fileRef.getDownloadURL().then(url => {
        console.log("File uploaded successfully", url);
        setFileUrl(url);
        sendMail(url);
      });
    });
  }
  console.log(isApplyCaptured);

  return (
    <>
      <div className="content">
        {
          isApplyCaptured &&
          <div>
            <h1 className="flex justify-center items-center mb-4 text-2xl lg:text-3xl pt-10 font-bold text-gray-800">
              FINAL PREVIEW
            </h1>
          </div>
        }
        <div className="main relative ">
          <div className="px-[12px] md:px-[70px] text-xl font-semibold my-4 ">
            <h3>
              {selected}/{count} NOTEBOOK SELECTED IN PACK
            </h3>
          </div>
          {result && (
            <div className={`${loading ? 'opacity-5' : ''}  grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-7 h-72 overflow-y-scroll flex-wrap sm:px-16 `} >
              {result?.resultNotebook?.map((item, index) => {
                return (
                  <div className="flex items-center  flex-col " key={index}>
                    <BookCanvas
                      book={item}
                      width={180}
                      height={220}
                      isApplyCaptured={isApplyCaptured}
                      handleComplateIamgeCapturing={handleComplateIamgeCapturing}
                      totalBooks={result?.resultNotebook.length}
                      index={index}
                    />
                    {/* <img
                      className="w-9/12 min-h-[230px] max-h-[230px] h-full mx-auto object-cover object-center"
                      src={item.previewURL || item.url}
                      alt="image"
                />*/}
                    {item.designId === null && item.designs.length === 0 ? (
                      <button
                        onClick={(event) => handleModifyDesign(event, item.id)}
                        className=" text-center my-3 "
                      >
                        <i className="fa-light fa-plus text-xl mr-1"></i>
                        <span className="font-semibold text-sm">ADD</span>
                      </button>
                    ) : (
                      <button
                        onClick={(event) => handleModifyDesign(event, item.id)}
                        className="rounded-full my-3"
                      >
                        <i className="fa-regular fa-pen-to-square mr-1"></i>
                        <span className="font-semibold text-sm">EDIT</span>
                      </button>
                    )}
                  </div>

                );
              })}
            </div>
          )}
          {(loading || isApplyCaptured ) && (
            <>
              <div className=" absolute z-10 top-1/4 left-1/3 right-1/3 flex items-center justify-center p-10">
                <FadeLoader
                  color="#36d7b7"
                  height={18}
                  loading
                  margin={13}
                  radius={0}
                  width={3}
                />
              </div>
            </>
          )}
          <div className="flex justify-center items-center pt-4 pb-5 ">
            <div className="flex flex-col sm:flex-row justify-evenly md:justify-start col-span-3 gap-6 ">
              <a
                onClick={() => handleCloseButton(result.resultNotebook[0].id)}
                className="cursor-pointer border-2 font-bold  border-[#0035ff]  rounded text-base md:text-xl  px-24 text-center py-2.5 rounded-lg"
              >
                CLOSE
              </a>
              {flag ? (
                <a className=" border-2 font-bold bg-[#b2b2b2] text-white px-14 text-center py-2.5  text-base md:text-xl pointer-events-none rounded-lg">
                  <p>ADD TO CART</p>
                </a>
              ) : (
                // test
                <a
                  onClick={handleAddToCartButton}
                  className=" cursor-pointer select-none order-2 font-bold bg-[#0035ff] text-white  px-14 text-center py-2.5 text-base md:text-xl rounded-lg"
                >
                  ADD TO CART
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default FinalPreview;
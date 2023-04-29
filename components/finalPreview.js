import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
const FinalPreview = (props) => {
  const [flag, setFlag] = useState(false);
  let [result, setResult] = useState();
  let [count, setCount] = useState();
  let [selected, setSelected] = useState(0);
  const [target, setTarget] = useState(0);

  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("result"));
    setResult(data.result);
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

  const handleModifyDesign = (event, index) => {
    setTarget(index);
    result.target = index;
    setResult({ ...result, target: index });
    router.push(`/customize`);
  };
  const handleCloseButton = () => {
    result.target = target;
    router.push(`/customize`);
  };

  const handleAddToCartButton = () => {
    const add_to_product_data = {
      product: {
        title: "Navneet Custom Book",
        properties: result.resultNotebook,
        quantity: result.quantity,
        status: "active",
        vendor: "navneet",
        product_type: "customised",
        product_type: "Snowboard",
      },
    };
    try {
      const cookies = document.cookie.split("; ");
      const cartId = cookies.filter(
        (element) => element.substring(0, 4) === "cart"
      );
      if (cartId.length !== 0) {
        fetch(`https://navneetbackend.geexu.org/cart?${cartId[0]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(add_to_product_data),
        }).then((resp) => {
          console.log("response", resp);
          if (resp.status === 200) {
            window.location.replace("https://navneetdemo.geexu.org/cart");
            // setLoading(false);
            // setIsSave(false);
          }
        });
      } else {
        alert("invalid Cart ID ");
      }
    } catch (err) {
      console.log("Error is here", err);
    }
  };

  return (
    <>
      <div className="content">
        <div>
          <h1 className="flex justify-center items-center mb-4 text-2xl lg:text-3xl pt-10 font-bold text-gray-800">
            FINAL PREVIEW
          </h1>
        </div>
        <div className="main">
          <div className="px-[12px] md:px-[70px] text-xl font-semibold my-4 ">
            <h3>
              {selected}/{count} NOTEBOOK SELECTED IN PACK
            </h3>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-7 h-72 overflow-y-auto flex-wrap sm:px-16 ">
            {result ? (
              result.resultNotebook.map((item, index) => {
                return (
                  <div className="flex items-center  flex-col " key={index}>
                    <img
                      className="w-11/12 h-full mx-auto object-cover object-center"
                      src={item.url}
                      alt="image"
                    />
                    {item.designId === null ? (
                      <button
                        onClick={(event) => handleModifyDesign(event, index)}
                        className=" text-center my-3 "
                      >
                        <i className="fa-light fa-plus text-xl mr-1"></i>
                        <span className="font-semibold text-sm">ADD</span>
                      </button>
                    ) : (
                      <button
                        onClick={(event) => handleModifyDesign(event, index)}
                        className="rounded-full my-3"
                      >
                        <i className="fa-regular fa-pen-to-square mr-1"></i>
                        <span className="font-semibold text-sm">EDIT</span>
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <>
                {" "}
                <FadeLoader
                  color="#36d7b7"
                  height={18}
                  loading
                  margin={13}
                  radius={0}
                  width={3}
                />
              </>
            )}
          </div>
          <div className="flex justify-center items-center pt-4 pb-5 ">
            <div className="flex flex-col sm:flex-row justify-evenly md:justify-start col-span-3 gap-6 ">
              <a
                onClick={handleCloseButton}
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
    </>
  );
};
export default FinalPreview;

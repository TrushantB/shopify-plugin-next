import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
const FinalPreview = (props) => {
  const [flag, setFlag] = useState(false);
  let [result, setResult] = useState();
  const router = useRouter();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const dataString = decodeURIComponent(searchParams.get("data"));
    const data = deserialize(dataString);
    setResult(data);
    data.resultNotebook.map((item) => {
      if (item.designId === null) {
        setFlag(true);
      }
    });
  }, []);
  const deserialize = (str) => {
    const revive = (key, value) => {
      if (typeof value === "string" && /^function\s*\(/.test(value)) {
        return eval(`(${value})`);
      } else if (value === "[Circular]") {
        return { __circular__: true };
      } else {
        return value;
      }
    };
    return JSON.parse(str, revive);
  };
  const handleModifyDesign = () => {
    router.push("/customize");
  };
  const handleCloseButton = () => {
    router.push("/customize");
  };
  const handleAddToCartButton = () => {
    const add_to_product_data = {
      product: {
        title: "Customm Book",
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
      console.log("all cookies", cookies);
      const cartId = cookies.filter(
        (element) => element.substring(0, 4) === "cart"
      );
      console.log("cartid===>", cartId[0]);
      // console.log("cookies== geexu>", document.cookie);

      // setLoading(true);
      if (cartId.length !== 0) {
        fetch(`https://shopify-backend-x0gg.onrender.com/cart?${cartId[0]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(add_to_product_data),
        }).then((resp) => {
          console.log("response", resp);
          if (resp.status === 200) {
            // window.location.replace("https://navneet.geexu.org/cart");
            // setLoading(false);
            // setIsSave(false);
          }
        });
      } else {
        alert("invalid Cart ID");
      }
    } catch (err) {
      console.log("Error is here", err);
    }
  };

  return (
    <>
    <div className="content">
    <div>
        <h1 className="flex justify-center items-center mb-2 text-2xl lg:text-3xl pt-10 font-bold text-gray-800">
          FINAL PREVIEW
        </h1>
      </div>
      <div className="main">
        <div className="   lg:px-[70px]  text-xl font-bold">
          <h3>6/6 NOTEBOOK SELECTED IN PACK</h3>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-7 final sm:px-16 ">
          {result ? (
            result.resultNotebook.map((item) => {
              return (
                <div className="flex items-center  flex-col" key={item.id}>
                  <img src={item.url} />
                  {item.designId === null ? (
                    <button
                      onClick={handleModifyDesign}
                      className=" text-center "
                    >
                      <i class="fa-light fa-plus text-xl mr-3"></i><span className="font-bold">ADD</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleModifyDesign}
                      className="rounded-full "
                    >
                     <i class="fa-regular fa-pen-to-square mr-3"></i><span className="font-bold">EDIT</span> 
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
        <div className="flex justify-center items-center mt-5 ">
          <div className="flex flex-col sm:flex-row justify-evenly md:justify-start col-span-3 gap-2">
            <a
              onClick={handleCloseButton}
              className=" border-2 font-bold  border-[#0035ff]  rounded text-base md:text-xl  w-64 text-center py-2.5"
            >
              CLOSE
            </a>
            {flag ? (
              <a className=" border-2 font-bold bg-[#b2b2b2] text-white w-64 text-center py-2.5 rounded text-base md:text-xl pointer-events-none">
                <p>ADD TO CART</p>
              </a>
            ) : (
              <a
                onClick={handleAddToCartButton}
                className=" cursor-pointer select-none order-2 font-bold bg-[#0035ff] text-white w-64 text-center py-2.5 rounded text-base md:text-xl"
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

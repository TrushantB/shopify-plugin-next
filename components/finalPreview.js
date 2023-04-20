import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FadeLoader } from "react-spinners";
const FinalPreview = (props) => {
  const [flag, setFlag] = useState(false);
  let [result, setResult] = useState();
  let [count, setCount] = useState();
  const router = useRouter();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const dataString = decodeURIComponent(searchParams.get("data"));
    const data = deserialize(dataString);
    setResult(data);
    setCount(data.quantity);
    console.log(data);
    if (data.isDesignApplyForAll) {
      const notebook = data.resultNotebook[0];
      let i = 1;
      while (i < data.quantity) {
        data.resultNotebook.push(notebook);
        i++;
      }
    } else {
      data.resultNotebook.map((item) => {
        if (item.designId === null) {
          setFlag(true);
        }
      });
    }
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
      <div>
        <h1 className="flex justify-center items-center mb-2 text-2xl lg:text-4xl pt-20 font-bold text-gray-800">
          FINAL PREVIEW
        </h1>
      </div>
      <div>
        <div>
          <h3>{count} NOTEBOOK SELECTED IN PACK</h3>
        </div>
        <div className="flex">
          {result ? (
            result.resultNotebook.map((item) => {
              return (
                <div className="m-4" key={item.id}>
                  <img src={item.url} />
                  {item.designId === null ? (
                    <button
                      onClick={handleModifyDesign}
                      className="rounded-full text-center border"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={handleModifyDesign}
                      className="rounded-full text-center border"
                    >
                      Edit
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
        <div className="flex justify-center items-center">
          <div className="flex justify-evenly md:justify-start col-span-3 gap-2">
            <a
              onClick={handleCloseButton}
              className="flex items-center justify-center cursor-pointer rounded-full py-2 px-4 md:px-5 text-center bg-white hover:bg-indigo-500 border font-bold text-gray-500 text-sm "
            >
              CLOSE
            </a>
            {flag ? (
              <a className="flex cursor-pointer select-none rounded-full text-center bg-slate-400 py-2 px-4 md:px-5 font-bold text-white text-sm pointer-events-none">
                ADD TO CART
              </a>
            ) : (
              <a
                onClick={handleAddToCartButton}
                className="flex cursor-pointer select-none rounded-full text-center bg-indigo-500 hover:bg-indigo-700 py-2 px-4 md:px-5 font-bold text-white text-sm "
              >
                ADD TO CART
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FinalPreview;

import Image from "next/image";
import cover from "@/public/cover.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import { useCookies } from "react-cookie";

// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
const Specification = () => {
  const [specifications, setSpecifications] = useState([]);
  const [specificationValues, setSpecificationValues] = useState({});
  const [cookies, setCookie] = useCookies();
  // const queryParams = new URLSearchParams(window.location.search);
  // const term = queryParams.get("term");
  // const location = queryParams.get("location");
  useEffect(() => {
    document.cookie = "hello=world; domain=geexu.org; Secure";
    console.log("cookies== geexu>", cookies);
    console.log(window.location);
    const url = window.location.search;
    const cartID = url.split("?");
    console.log(cartID);
  }, []);

  // useEffect(() => {
  //   const handleTabClose = (event) => {
  //     event.preventDefault();

  //     console.log("beforeunload event triggered");
  //     const router_prompt = <Prompt message="are you want to close" />;
  //     // window.location.replace("https://ekartbook.myshopify.com/");
  //     return (
  //       router_prompt, (event.returnValue = "Are you sure you want to exit?")
  //     );
  //   };

  //   window.addEventListener("beforeunload", handleTabClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleTabClose);
  //   };
  // }, []);
  const handleChange = (event) => {
    console.log(event.target.name, event.target.id);
    setSpecificationValues({
      ...specificationValues,
      [event.target.name]: event.target.id,
    });
  };
  useEffect(() => {
    axios.get("/api/specifications").then((response) => {
      setSpecifications(response.data.data);
      setSpecificationValues(response.data.defaultValues);
    });
  }, []);

  const submitSpecifications = () => {
    sessionStorage.setItem(
      "notebookDetails",
      JSON.stringify({ specifications: specificationValues })
    );
  };

  return (
    <>
      <Header />

      <div className=" items-center h-full  grid  grid-cols-1 lg:grid-cols-2">
        <div className=" bg-indigo-500  p-8  h-full flex items-center justify-center ">
          <Image src={cover} height={450} width={350} />
        </div>
        <div className=" py-16 px-4 md:px-5 bg-slate-100 ">
          <div className="text-center mb-10 py-3  leading-10">
            <p className="text-2xl  lg:text-5xl pb-3">Start By Choosing Your</p>
            <h1 className="font-bold text-2xl  lg:text-5xl text-gray-900">
              NOTEBOOK TYPE
            </h1>
          </div>
          <div className="pr-5">
            {specifications.map((specification, index) => (
              <div
                className=" my-3 grid grid-cols-1 md:grid-cols-4"
                key={index}
              >
                <label
                  htmlFor={specification.value}
                  className="text-md font-semibold  py-2 col-span-1  "
                >
                  {specification.label}
                </label>
                <div className=" items-center justify-center w-full col-span-3">
                  <div
                    className={`grid w-full ${
                      specification.variations.length < 4
                        ? "grid-cols-2"
                        : "grid-cols-5"
                    }   rounded-full bg-white p-2`}
                  >
                    {specification.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center"
                      >
                        <input
                          type="radio"
                          name={specification.value}
                          id={variation.value}
                          className="peer hidden"
                          checked={
                            variation.value ===
                            specificationValues[specification.value]
                          }
                          onChange={(e) => handleChange(e)}
                        />
                        <label
                          htmlFor={variation.value}
                          className="block cursor-pointer select-none rounded-full p-2 w-full text-center peer-checked:bg-indigo-500 peer-checked:font-bold peer-checked:text-white text-sm"
                        >
                          {variation.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 py-">
            <div className="col-span-1"></div>
            <div className="flex justify-evenly md:justify-start  col-span-3 gap-2">
              <Link
                onClick={submitSpecifications}
                href={"/term-and-conditions"}
                className="flex items-center justify-center cursor-pointer  rounded-full py-2 px-4 md:px-5   text-center bg-white hover:bg-indigo-500  border font-bold text-gray-500 text-sm "
              >
                Bulk Order
              </Link>
              <Link
                onClick={submitSpecifications}
                href={"/term-and-conditions"}
                className="flex cursor-pointer select-none rounded-full  text-center bg-indigo-500 hover:bg-indigo-700 py-2 px-4 md:px-5 font-bold text-white text-sm "
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Specification;

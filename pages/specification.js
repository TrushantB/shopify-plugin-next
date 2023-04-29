import Image from "next/image";
import cover from "@/public/cover.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
const Specification = () => {
  const [specifications, setSpecifications] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [specificationValues, setSpecificationValues] = useState({});
  const router = useRouter();
  const handleChange = (event) => {
    if (event.target.id >= 25) {
      setIsMore(true);
    } else {
      setIsMore(false);
    }
    setSpecificationValues({
      ...specificationValues,
      [event.target.name]: event.target.id,
    });
  };
  const handleInputChange = (event) => {
    setSpecificationValues({
      ...specificationValues,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    axios.get("/api/specifications").then((response) => {
      setSpecifications(response.data.data);
      setSpecificationValues(response.data.defaultValues);
    });
    sessionStorage.clear("result");
  }, []);

  const submitSpecifications = () => {
    sessionStorage.setItem(
      "notebookDetails",
      JSON.stringify({ specifications: specificationValues })
    );
    if (
      specificationValues.quantity % 6 !== 0 ||
      specificationValues.quantity == 0
    ) {
      console.log("Input value should be multiple of 6");
    } else {
      router.push("/customize");
    }
  };

  return (
    <>
      {/* <Header /> */}

      <div className=" items-center h-full  grid  grid-cols-1 lg:grid-cols-2">
        <div className=" bg-[#ffedc4] book  p-8  h-full flex items-center justify-center ">
          <Image src={cover} height={450} width={350} />
        </div>
        <div className="py-16 px-14 h-screen mx-auto overflow-scroll">
          <div className="text-center mb-10 py-3  leading-10">
            <h4 className="font-bold text-2xl  lg:text-3xl text-gray-900">
              CHOOSE YOUR NOTEBOOK TYPE
            </h4>
          </div>
          <div className="pr-5">
            {specifications.map((specification, index) => (
              <div
                className=" my-3 grid grid-cols-1 md:grid-cols-4 "
                key={index}
              >
                <label
                  htmlFor={specification.value}
                  className="text-md font-semibold uppercase text-xl   py-2 col-span-1 flex items-center "
                >
                  {specification.label}
                </label>
                <div className="  items-center justify-center w-full col-span-3 mb-2">
                  <div
                    className={`grid w-full ${specification.variations.length < 4
                      ? "grid-cols-2"
                      : "grid-cols-5 bg-white "
                      }   rounded-lg bg-[#f4f5fa] p-2`}
                  >
                    {specification.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center"
                      >
                        {variation.label === "+More" && isMore ? (
                          <>
                            <input
                              type="number"
                              min={6}
                              max={100}
                              step={6}
                              // value={6}
                              defaultValue={30}
                              name={specification.value}
                              id={variation.label}
                              className="peer"
                              onChange={(e) => handleInputChange(e)}
                            />
                          </>
                        ) : (
                          <>
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
                              className="block cursor-pointer select-none rounded-lg text-md  p-2.5 w-full text-center  numbers peer-checked:bg-[#fbb900]  peer-checked:text-black "
                            >
                              {variation.label}
                            </label>{" "}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <div className="col-span-1"></div>
            <div className="flex justify-evenly md:justify-start  col-span-3 gap-2">
              <button
                onClick={submitSpecifications}
                // href={"/customize"}
                className=" cursor-pointer select-none w-full flex justify-center text-center bg-[#0035ff] rounded p-3  px-4 md:px-5 font-bold text-white text-xl "
              >
                CONTINUE
              </button>
            </div>
          </div>
          <div className="bg-[#edf7fa] p-4 mt-5 rounded">
            <h3 className=" text-xl font-semibold mb-4">THINGS TO KNOW</h3>
            <ul className="marker:text-[#0035ff] list-outside list-disc ml-6">
              <li>Minimum Pack Size is 6</li>
              <li> Shipping Charges Rs.80</li>
              <li> MRP inclusive of tax</li>
              <li> Cover page type- Soft cover</li>
              <li>
                {" "}
                Customize order take 5-7 days to dispatch & 2-3 days to delivery
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};
export default Specification;

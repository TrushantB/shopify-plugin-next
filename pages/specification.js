import Image from "next/image";
import cover from '@/public/cover.svg'
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const Specification = () => {
  const [specifications, setSpecifications] = useState([]);
  const [specificationValues, setSpecificationValues] = useState({});

  const handleChange = (event) => {
    console.log(event.target.name, event.target.id);
    setSpecificationValues({ ...specificationValues, [event.target.name]: event.target.id })
  }
  useEffect(() => {
    axios.get('/api/specifications').then((response) => {
      setSpecifications(response.data.data);
      setSpecificationValues(response.data.defaultValues)
    })
  }, [])

  const submitSpecifications = () => {
    sessionStorage.setItem("notebookDetails", JSON.stringify({ specifications: specificationValues }));
  }

  return (
    <>
      <Header />
      <div className="bg-indigo-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-scroll">
        <div className="md:flex w-full items-center h-screen">
          <div className="w-1/2 bg-indigo-500 py-10 px-10 h-full flex items-center justify-center ">
            <Image src={cover} height={450} width={350} />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10 leading-10">
              <p className="text-5xl">Start By Choosing Your</p>
              <h1 className="font-bold text-5xl text-gray-900">
                NOTEBOOK TYPE
              </h1>
            </div>
            <div className="pr-5">
              {
                specifications.map((specification, index) => (
                  <div className="flex -mx-3 my-3" key={index}>
                    <label htmlFor={specification.value} className="text-xl font-semibold mr-10 py-2 w-1/4">
                      {specification.label}
                    </label>
                    <div className=" items-center justify-center w-full">
                      <div className={`grid w-full ${specification.variations.length < 4 ? 'grid-cols-2' : 'grid-cols-5'} gap-4  rounded-full bg-gray-200 p-2`}>
                        {
                          specification.variations.map((variation, index) => (
                            <div key={index}>
                              <input
                                type="radio"
                                name={specification.value}
                                id={variation.value}
                                className="peer hidden"
                                checked={variation.value === specificationValues[specification.value]}
                                onChange={(e) => handleChange(e)}
                              />
                              <label
                                htmlFor={variation.value}
                                className="block cursor-pointer select-none rounded-full p-3 text-center peer-checked:bg-indigo-500 peer-checked:font-bold peer-checked:text-white text-xl"
                              >
                                {variation.label}
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>
            <div className="flex gap-3 -mx-3">
              <Link onClick={submitSpecifications} href={'/term-and-conditions'} className="block cursor-pointer select-none rounded-full p-3 text-center bg-white  border font-bold text-gray-500 text-xl w-1/2">Bulk Order</Link>
              <Link onClick={submitSpecifications} href={'/term-and-conditions'} className="block cursor-pointer select-none rounded-full p-3 text-center bg-indigo-500 font-bold text-white text-xl w-1/2">Continue</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Specification;
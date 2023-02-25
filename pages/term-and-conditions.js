import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";

const TermAndConditions = () => {
    const router = useRouter();
    const [notebookDetails, setNotebookDetails] = useState({});
    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [isAgreeTermsAndConditions, setIsAgreeTermsAndConditions] = useState(false);
    useEffect(() => {
        const notebookDetails = JSON.parse(sessionStorage.getItem("notebookDetails"));
        setNotebookDetails(notebookDetails);

        if (!Number(notebookDetails?.specifications?.quantity)) {
            router.push('/specification')
        } else if (notebookDetails.isAgreeTermsAndConditions) {
            router.push('/customize')
        } else {
            axios.get("/api/quick-tips").then((response) => {
                setTermsAndConditions(response.data)
            })
        }

    }, [])
    const submitTermsAndConditions = () => {
        if (isAgreeTermsAndConditions) {
            sessionStorage.setItem("notebookDetails", JSON.stringify({ ...notebookDetails, isAgreeTermsAndConditions }))
            router.push('/customize')
        }
    }
    return (
        <div className="bg-indigo-100">
            <Header />
            <div className="max-w-5xl mx-auto text-center px-2">
                <p className="w-full block text-center text-2xl  font-bold my-3 md:text-3xl lg:text-4xl ">Quick tips</p>
                {
                    termsAndConditions.map((item) => (
                        <div key={item.id} className="block  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
                            <p className="font-normal text-md md:text-lg lg:text-xl text-gray-700 dark:text-gray-400">{item.title}</p>
                        </div>
                    ))
                }
                <p className="w-full block text-center text-2xl md:text-3xl lg:text-4xl font-bold my-3">Terms & Conditions</p>
                <p className="w-full block text-center text-sm my-3">Read the terms and conditions before you agree</p>
                <div className="flex items-center justify-center my-3">
                    <input id="termsAndCondition" className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300  checked:bg-blue-600   checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" onChange={() => { }} checked={isAgreeTermsAndConditions} onClick={() => setIsAgreeTermsAndConditions(!isAgreeTermsAndConditions)} />
                    <label htmlFor="termsAndCondition" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        I agree to these <a href="#" className="text-blue-500">Terms & Conditions</a></label>
                </div>

                <div className="flex items-center justify-center my-3">
                    <div onClick={submitTermsAndConditions} className={`rounded-full py-2 px-8 text-center font-bold text-white text-xl ${isAgreeTermsAndConditions ? 'cursor-pointer bg-indigo-500' : 'bg-gray-300'}`}>Customize Now</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default TermAndConditions;
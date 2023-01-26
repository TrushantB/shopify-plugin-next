import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

const TermAndConditions = () => {
    return (
        <div className="bg-indigo-100">
            <Header />
            <div className="max-w-5xl mx-auto text-center">
                <p className="w-full block text-center text-4xl font-bold my-3">Quick tips</p>
                <div className="block  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
                    <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Image size should not exceed 10MB & video size should not exceed 100MB</p>
                </div>
                <div className="block  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-3">
                    <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Please avoid uploading images of celebrities, sports stars, TV characters, cartoon characters or images for which you do not own the copyrights.</p>
                </div>
                <div className="flex gap-3 my-3">
                    <div className="block w-1/2  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Please ensure to resize the images as necessary to fit the canvas. You can open the canvas & resize the image.</p>
                    </div>
                    <div className="block w-1/2  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Please avoid placing any text too close to the border since there are slight chances that it might get cut.</p>
                    </div>
                </div>
                <div className="flex gap-3 my-3">
                    <div className="block w-1/2  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Please Check final preview to see if orientation is correct.</p>
                    </div>
                    <div className="block w-1/2  p-6 bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">Please Check final preview to see if the designs are placed as you wish.</p>
                    </div>
                </div>
                <p className="w-full block text-center text-4xl font-bold my-3">Terms & Conditions</p>
                <p className="w-full block text-center text-sm my-3">Read the terms and conditions before you agree</p>
                <div className="flex items-center justify-center my-3">
                    <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="termsAndCondition" id="termsAndCondition" />
                    <label for="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        I agree to these <a href="#" className="text-blue-500">Terms & Conditions</a></label>
                </div>
                <div className="flex items-center justify-center my-3">
                    <Link href={'/customize'} className="block cursor-pointer select-none rounded-full py-3 px-10 text-center bg-indigo-500 font-bold text-white text-xl ">Customize Now</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default TermAndConditions;
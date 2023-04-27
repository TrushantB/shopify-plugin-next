import React from "react";
const DesignAction = ({ handleClearDesign, handleAllClearDesign, handleApplyForAll, notebookDetails }) => {
    return (
        <div className="flex flex-col flex-sm-row w-full h-14 justify-center gap-2 my-10   ">
            <div
                onClick={handleClearDesign}
                className="flex justify-center items-center flex-col mx-3  w-12/12 sm:w-4/12 p-3 rounded cursor-pointer border-2 border-[#0035ff]"
            >
                <span className="text-xl font-bold">CLEAR DESIGN</span>
            </div>

            {/* clear all design */}
            <div
                onClick={handleAllClearDesign}
                className=" flex justify-center items-center flex-col mx-3  w-12/12 sm:w-4/12 p-3 rounded cursor-pointer border-2 border-[#0035ff]"
            >
                <span className="text-xl font-bold">CLEAR ALL </span>
            </div>

            {/* apply for all */}
            <div
                onClick={handleApplyForAll}
                className="text-white flex justify-center items-center flex-col mx-3 bg-[#0035ff] p-3 w-12/12 sm:w-4/12 rounded cursor-pointer"
            >
                <span className="text-xl font-bold text-white">
                    {notebookDetails?.isApplyForAll
                        ? "Applied For All"
                        : "APPLY TO ALL"}
                </span>
            </div>
        </div>
    )
}

export default DesignAction;
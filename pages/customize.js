import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FadeLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';
const sampleImage = "/dummy-book-image.jpeg";

const Designer = dynamic(() => import("@/components/designer"), {
  ssr: false,
});
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});
import { designTemplates } from "@/lib/constants";
import { useRouter } from "next/router";
import { generateString } from "@/lib/generateId";

function Customize() {
  const router = useRouter();
  const [notebookDetails, setNotebookDetails] = useState({});
  const [selectedNotebook, setSelectedNotebook] = React.useState({});
  const [color, setColor] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [imageSize, setImageSize] = useState(false);


  const [bookForPurchase, setBookForPurchase] = useState([]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [changes]);

  useEffect(() => {
    const notebookDetails = JSON.parse(
      sessionStorage.getItem("notebookDetails")
    );
    const data = JSON.parse(sessionStorage.getItem("result"));

    setNotebookDetails(notebookDetails);
    if (Number(notebookDetails?.specifications?.quantity)) {
      const bookSet = Array.from(
        Array(Number(notebookDetails.specifications.quantity)).keys(
          Number(notebookDetails.specifications.quantity)
        )
      ).map((id) => ({
        id: generateString(14),
        url: sampleImage,
        isCustomizedDesign: true,
        designId: null,
        designs: [],
      }));

      if (data?.result) {
        const selectedNotebook = JSON.parse(
          sessionStorage.getItem("selectedId")
        );
        const selectedBook = data.result.resultNotebook.filter(
          (item) => item.id === selectedNotebook?.selectedNotebook
        );
        setSelectedNotebook(selectedBook[0]);
        setBookForPurchase(data.result.resultNotebook);
      } else {
        setBookForPurchase(bookSet);
        setSelectedNotebook(bookSet[0]);
      }
    }
  }, []);

  function handleBeforeUnload(event) {
    if (changes) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  const handleAddtext = (text) => {
    bookForPurchase.map((book) => {

      if (book.id === selectedNotebook.id) {
        const design = {
          type: "text",
          isDragging: false,
          width: 300 / 3,
          x: 300 / 2 - 300 / 3 / 2,
          y: 350 / 2 - 350 / 3 / 2,
          url: "",
          height: 350 / 15,
          text: text,
          color: color,
          isSelected: false,
        };
        book.designId = generateString(14);
        book.designs.push(design);
        setSelectedNotebook({ ...selectedNotebook });
      }
    });
    setChanges(true);
  };
  const handleAddImage = async (event) => {
    await setImage(URL.createObjectURL(event.target.files[0]));
    let imageSize = event.target.files[0].size;
    imageSize = imageSize / 1024;
    if (imageSize > 100) {
      bookForPurchase.map((book) => {
        if (book.id === selectedNotebook.id) {
          const design = {
            type: "image",
            isDragging: false,
            width: 300 / 3,
            height: 350 / 3,
            x: 100,
            y: 100,
            url: URL.createObjectURL(event.target.files[0]),
          };
          book.designId = generateString(14);
          book.designs.push(design);
          setSelectedNotebook({ ...selectedNotebook, updatedAt: new Date()});
          setChanges(true);
        }
      });
    } else {
      toast.error("Image size should be greater than 100 KB")
    }
  };
  const handleTextColor = (event, param) => {
    setColor(param);
  };


  const applyDesign = (bookDesign) => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        book.url = bookDesign.url;
        book.designId = bookDesign.id;
        book.isCustomizedDesign = false;
        setSelectedNotebook({
          ...selectedNotebook,
          url: bookDesign.url,
          designId: bookDesign.id,
          isCustomizedDesign: false,
          updatedAt: new Date()
        });
        setTimeout(() => {
          setSelectedNotebook({
            ...selectedNotebook,
            url: bookDesign.url,
            designId: bookDesign.id,
            isCustomizedDesign: false,
            updatedAt: new Date()
          })
        }, 100);
      }
    });
    setChanges(true);
    setBookForPurchase([...bookForPurchase]);
  };

  const handleApplyForAll = () => {
    setNotebookDetails({
      ...notebookDetails,
      isApplyForAll: true,
    });
    bookForPurchase.map((book, index) => {
      book.url = selectedNotebook.url;
      book.designId = selectedNotebook.designId;
      book.isCustomizedDesign = selectedNotebook.isCustomizedDesign;
      book.designs = selectedNotebook.designs;
      // book.id = generateString(14);
    });
    let result = {
      product_id: generateString(14),
      isAgreeTermsAndConditions: notebookDetails.isAgreeTermsAndConditions,
      isDesignApplyForAll: true,
      resultNotebook: bookForPurchase,
      quantity: Number(bookForPurchase.length),
    };
    sessionStorage.setItem("result", JSON.stringify({ result: result }));
    router.push(`/finalpreviews`);
  };

  const handleClearDesign = () => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      if (book.id === selectedNotebook.id) {
        book.url = sampleImage;
        book.designId = null;
        book.isCustomizedDesign = true;
        book.designs = [];
        setSelectedNotebook({
          ...selectedNotebook,
          url: sampleImage,
          designId: null,
          isCustomizedDesign: false,
          designs: [],
        });
      }
    });
  };
  const handleAllClearDesign = async () => {
    setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
    bookForPurchase.map((book) => {
      book.url = sampleImage;
      book.designId = null;
      book.isCustomizedDesign = true;
      book.designs = [];
      setSelectedNotebook({
        ...selectedNotebook,
        url: sampleImage,
        designId: null,
        isCustomizedDesign: false,
        designs: [],
      });
    });
    setChanges(false);
    sessionStorage.removeItem('result');
    sessionStorage.removeItem('selectedId');
  };

  const handleResult = async () => {
    const resultNotebook = [];
    const { quantity, ...rest } = notebookDetails.specifications;
    let result = {
      product_id: generateString(14),
      isAgreeTermsAndConditions: notebookDetails.isAgreeTermsAndConditions,
      isDesignApplyForAll: notebookDetails.isApplyForAll,
      resultNotebook: resultNotebook,
      quantity: Number(quantity),
    };
    if (notebookDetails.isApplyForAll) {
      result.designId = selectedNotebook.designId;
      result.resultNotebook.push({
        designId: selectedNotebook.designId,
        url: selectedNotebook.url,
        id: 0,
        ...rest,
      });
    } else {
      bookForPurchase.map((book) => {
        resultNotebook.push({
          id: book.id,
          designId: book.designId,
          url: book.url,
          designs: book.designs,
          ...rest,
        });
      });
      result.resultNotebook = resultNotebook;
    }

    sessionStorage.setItem("result", JSON.stringify({ result: result }));
    router.push(`/finalpreviews`);
  };

  return (
    <React.Fragment>
      {!loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Designer
            selectedNotebook={selectedNotebook}
            setSelectedNotebook={setSelectedNotebook}
            bookForPurchase={bookForPurchase}
            handleApplyForAll={handleApplyForAll}
            handleClearDesign={handleClearDesign}
            handleAllClearDesign={handleAllClearDesign}
            notebookDetails={notebookDetails}
            setBookForPurchase={setBookForPurchase}
            color={color}

          />
          <Editor
            designTemplates={designTemplates}
            applyDesign={applyDesign}
            handleResult={handleResult}
            notebookDetails={notebookDetails}
            handleAddtext={handleAddtext}
            handleAddImage={handleAddImage}
            handleTextColor={handleTextColor}
            selectedNotebook={selectedNotebook}
            setSelectedNotebook={setSelectedNotebook}
          />
          <Toaster />
        </div>
      ) : (
        <div className="w-auto h-auto flex items-center justify-center">
          <FadeLoader
            color="#36d7b7"
            height={18}
            loading
            margin={13}
            radius={0}
            width={3}
          />
          <h3>Adding product to cart</h3>
        </div>
      )}
    </React.Fragment>
  );
}

export default Customize;

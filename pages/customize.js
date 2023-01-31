import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const sampleImage = 'http://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-square-1.jpg';

const Designer = dynamic(() => import("@/components/designer"), {
    ssr: false,
});
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
});
import { designTemplates } from '@/lib/constants';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';

function Customize() {
    const router = useRouter();
    const [notebookDetails, setNotebookDetails] = useState({});
    const [selectedNotebook, setSelectedNotebook] = React.useState({});
    // const [modal, setModal] = React.useState({
    //     isOpen: false,
    //     message: 'anjay'
    // })
    const [bookForPurchase, setBookForPurchase] = useState([]);
    const handleAddtext = (text) => {
        bookForPurchase.map((book) => {
            if (book.id === selectedNotebook.id) {
                const design = {
                    type: "text",
                    isDragging: false,
                    width: 300 / 3,
                    x: 300 / 2 - (300 / 3) / 2,
                    y: 350 / 2 - (350 / 3) / 2,
                    url: '',
                    height: 350 / 15,
                    text: text,

                }
                book.designs.push(design);
                setSelectedNotebook({ ...selectedNotebook })
            }
        })
    }
    const handleAddImage = (image) => {
        bookForPurchase.map((book) => {
            if (book.id === selectedNotebook.id) {
                const design = {
                    type: "image",
                    isDragging: false,
                    width: 300 / 3,
                    height: 350 / 3,
                    x: 0,
                    y: 0,
                    url: 'https://i.ibb.co/sskfDr1/lover-4992877-640.png'
                }
                book.designs.push(design);
                setSelectedNotebook({ ...selectedNotebook })
            }
        })
    }
    useEffect(() => {
        const notebookDetails = JSON.parse(sessionStorage.getItem("notebookDetails"));
        setNotebookDetails(notebookDetails);
        if (Number(notebookDetails?.specifications?.quantity)) {
            const bookSet = Array.from(Array(Number(notebookDetails.specifications.quantity)).keys(Number(notebookDetails.specifications.quantity))).map((id) => ({
                id,
                url: sampleImage,
                isCustomizedDesign: true,
                designId: null,
                designs: []
            }))

            setBookForPurchase(bookSet);
            setSelectedNotebook(bookSet[0])
        } else {
            router.push('/specification')
        }
    }, []);

    // React.useEffect(() => {
    //   // console.log(tshirt)
    // }, [])

    // const checkDeselect = e => {
    //     // deselect when clicked on empty area
    //     const clickedOnEmpty = e.target === e.target.getStage();
    //     if (clickedOnEmpty) {
    //         setSelected(false);
    //     }
    // };

    // function closeModal() {
    //     setModal({
    //         isOpen: false,
    //         message: null
    //     })
    // }



    // React.useEffect(() => {
    //     if (!appLoaded) {
    //         // preload images
    //         for (let i = 0; i < tshirts.length; i++) {
    //             const pic = tshirts[i];
    //             const image = new Image()
    //             image.src = pic
    //             image.onload = () => {
    //                 // hide loading when the last image has been loaded
    //                 if (i === (tshirts.length - 1)) {
    //                     setAppLoaded(true)
    //                     let fisrtLoad = document.getElementById("fisrtLoad")
    //                     fisrtLoad.classList.add("fade-out")
    //                     setTimeout(() => {
    //                         fisrtLoad.style.display = "none"
    //                     }, 500)
    //                 }
    //             }

    //         }
    //     }
    // }, [appLoaded, setAppLoaded])
    const applyDesign = (bookDesign) => {
        setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
        bookForPurchase.map((book) => {
            if (book.id === selectedNotebook.id) {
                book.url = bookDesign.url
                book.designId = bookDesign.id
                book.isCustomizedDesign = false
                setSelectedNotebook({ ...selectedNotebook, url: bookDesign.url, designId: bookDesign.id, isCustomizedDesign: false })
            }
        })
        setBookForPurchase([...bookForPurchase])
    }

    const handleApplyForAll = () => {
        setNotebookDetails({ ...notebookDetails, isApplyForAll: true });
        bookForPurchase.map((book) => {
            book.url = selectedNotebook.url
            book.designId = selectedNotebook.designId
            book.isCustomizedDesign = selectedNotebook.isCustomizedDesign
            book.designs = selectedNotebook.designs
        })

    }
    const handleClearDesign = () => {
        setNotebookDetails({ ...notebookDetails, isApplyForAll: false });
        bookForPurchase.map((book) => {
            if (book.id === selectedNotebook.id) {
                book.url = sampleImage
                book.designId = null
                book.isCustomizedDesign = true
                book.designs = []
                setSelectedNotebook({ ...selectedNotebook, url: sampleImage, designId: null, isCustomizedDesign: false, designs: [] })
            }

        })
    }

    const handleResult = () => {
        const resultNotebook = [];
        const { quantity, ...rest } = notebookDetails.specifications;
        let result = {
            // specifications: notebookDetails.specifications,
            isAgreeTermsAndConditions: notebookDetails.isAgreeTermsAndConditions,
            isDesignApplyForAll: notebookDetails.isApplyForAll,
            resultNotebook: resultNotebook,
            quantity: Number(quantity)

        }
        if (notebookDetails.isApplyForAll) {
            result.designId = selectedNotebook.designId
            result.resultNotebook.push({
                designId: selectedNotebook.designId,
                url: selectedNotebook.url,
                ...rest
            })
        } else {
            bookForPurchase.map((book) => {
                resultNotebook.push({
                    id: book.id,
                    designId: book.designId,
                    url: book.url,
                    ...rest
                })
            })
            result.resultNotebook = resultNotebook;
        }

        console.log({ result });
    }

    return (
        <React.Fragment>
            <Header />
            <div className="min-h-screen block lg:flex justify-center items-center">
                <Designer
                    selectedNotebook={selectedNotebook}
                    setSelectedNotebook={setSelectedNotebook}
                    bookForPurchase={bookForPurchase}
                    handleApplyForAll={handleApplyForAll}
                    handleClearDesign={handleClearDesign}
                    notebookDetails={notebookDetails}
                    setBookForPurchase={setBookForPurchase}
                />
                <Editor
                    designTemplates={designTemplates}
                    applyDesign={applyDesign}
                    handleResult={handleResult}
                    notebookDetails={notebookDetails}
                    handleAddtext={handleAddtext}
                    handleAddImage={handleAddImage}
                />
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Customize;

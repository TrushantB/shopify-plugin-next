import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";

const Designer = dynamic(() => import("@/components/designer"), {
    ssr: false,
});
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
});
import { designTemplates } from '@/lib/constants';
import Header from '@/components/header';
import Footer from '@/components/footer';

function App() {
    const [appLoaded, setAppLoaded] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [selectedNotebook, setSelectedNotebook] = React.useState({});
    const [modal, setModal] = React.useState({
        isOpen: false,
        message: 'anjay'
    })
    const [bookForPurchase, setBookForPurchase] = useState([]);
    const elStage = React.useRef();
    useEffect(() => {
        setBookForPurchase(
            Array.from(Array(10).keys()).map((id) => ({
                id,
                url: `http://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-square-1.jpg`
            }))
        );
        setSelectedNotebook({
            id: 0,
            url: `http://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-square-1.jpg`
        })
    }, []);
    console.log({ selectedNotebook });

    // React.useEffect(() => {
    //   // console.log(tshirt)
    // }, [])

    const checkDeselect = e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(false);
        }
    };

    function closeModal() {
        setModal({
            isOpen: false,
            message: null
        })
    }



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
        bookForPurchase.map((book) => {
            if (book.id === selectedNotebook.id) {
                book.url = bookDesign.url
                setSelectedNotebook({ ...selectedNotebook, url: bookDesign.url })
            }
        })
        setBookForPurchase([...bookForPurchase])
    }

    return (
        <React.Fragment>
            <Header />
            <div className="min-h-screen block lg:flex justify-center items-center">
                <Designer
                    selectedNotebook={selectedNotebook}
                    setSelectedNotebook={setSelectedNotebook}
                    bookForPurchase={bookForPurchase}
                />
                <Editor
                    designTemplates={designTemplates}
                    applyDesign={applyDesign}

                />
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default App;

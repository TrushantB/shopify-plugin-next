import jsPDF from "jspdf";

export const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

export const createPDF = async (data) => {
    const doc = new jsPDF('portrait', 'pc', 'a4')
    doc.setFontSize(20);
    doc.text(18, 2, `CUSTOMIZATION DETAILS`);
    doc.text(1, 5, `Specifications`);
    doc.setFontSize(15);
    doc.text(2, 7, `Binding: ${data.specifications.binding}`);
    doc.text(2, 9, `Finishing: ${data.specifications.finishing}`);
    doc.text(2, 11, `Pages: ${data.specifications.pages}`);
    doc.text(2, 13, `Quantity: ${data.specifications.quantity}`);
    doc.text(2, 15, `Ruling: ${data.specifications.ruling}`);
    doc.text(2, 17, `Size: ${data.specifications.size}`);

    data.resultNotebook.map((item, index) => {
        doc.addPage();
        doc.setFontSize(20);
        doc.text(18, 5, `NOTEBOOK NO: ${(index + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`);
        return doc.addImage(item.previewURL, `JPEG`, 4, 8, 40, 50);
    })
    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], "Request_Quote.pdf", {
        type: "application/pdf",
    });

    return await file;

    // const pdfBlob = doc.output("blob");
    // const file = new File([pdfBlob], "Request_Quote.pdf", {
    //     type: "application/pdf",
    // });

    // toDataURL(selectedCatalogImage)
    //     .then(async (imgData) => {
    //         doc.setFontSize(20);
    //         doc.text(18, 2, `Product List`);
    //         doc.text(1, 5, `Customer Details`);
    //         doc.setFontSize(15);
    //         doc.text(2, 7, `First name: ${data.firstName}`);
    //         doc.text(2, 9, `Last name: ${data.lastName}`);
    //         doc.text(2, 11, `Email: ${data.email}`);
    //         doc.text(2, 13, `Phone: ${data.phoneNumber}`);
    //         doc.text(2, 15, `Zip: ${data.zip}`);
    //         doc.addImage(data.imgSrc, `JPEG`, 9, 18, 30, 20);
    //         doc.addImage(imgData, `JPEG`, 2, 42, 20, 12);
    //         // doc.text(25, 47, `${selectedCatalogName}`);

    //         const pdfBlob = doc.output("blob");
    //         const file = new File([pdfBlob], "Request_Quote.pdf", {
    //             type: "application/pdf",
    //         });
    //         await sendEmail({
    //             email: data.email,
    //             proposal_url: file,
    //             phoneno: data.phoneNumber,
    //             first_name: data.firstName,
    //             last_name: data.lastName,
    //             zip: data.zip
    //         });
    //     }).catch(error => {
    //         console.error('oops, something went wrong!', error);
    //         setLoaderVisibility(false);
    //     })
}
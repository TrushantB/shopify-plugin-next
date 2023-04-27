const { default: FinalPreview } = require("@/components/finalPreview");
const { default: Footer } = require("@/components/footer");
const { default: Header } = require("@/components/header");

const FinalPreviews = () => {
  return (
    <>
      <div className="wrapper">
        {/* <Header /> */}
        <FinalPreview />
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default FinalPreviews;

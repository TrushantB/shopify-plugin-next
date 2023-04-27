import dynamic from "next/dynamic";
const FinalPreview = dynamic(() => import("@/components/finalPreview"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
});
const Header = dynamic(() => import("@/components/header"), {
  ssr: false,
});

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

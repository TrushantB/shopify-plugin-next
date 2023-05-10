import dynamic from "next/dynamic";
const FinalPreview = dynamic(() => import("@/components/finalPreview"), {
  ssr: false,
});
const FinalPreviews = () => {
  return (
    <>
      <div className="wrapper">
        <FinalPreview />
      </div>
    </>
  );
};
export default FinalPreviews;

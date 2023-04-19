import { useEffect, useState } from "react";

const FinalPreview = () => {
  const [image, setImage] = useState([]);
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then((resp) => resp.json())
  //     .then((data) => setImage(data));
  //   console.log(image);
  // }, []);
  const data = [
    { id: 1, url: "https://picsum.photos/200/300" },
    { id: 2, url: "https://picsum.photos/200/301" },
    { id: 3, url: "https://picsum.photos/200/302" },
    { id: 4, url: "https://picsum.photos/200/303" },
    { id: 5, url: "https://picsum.photos/200/304" },
    { id: 6, url: "https://picsum.photos/200/305" },
  ];
  return (
    <>
      <div>
        <h1 className="flex justify-center items-center mb-2 text-2xl lg:text-4xl pt-20 font-bold text-gray-800">
          FINAL PREVIEW
        </h1>
      </div>
      <div>
        <div>
          <h3>6/6 NOTEBOOK SELECTED IN PACK</h3>
        </div>
        <div className="flex">
          {data.map((item) => {
            return (
              <div className="m-4" key={item.id}>
                <img src={item.url}></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FinalPreview;

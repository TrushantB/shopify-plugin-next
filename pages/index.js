import navneet from "@/public/navneet.jpeg";
import Image from "next/image";
import Header from "@/components/header";
import Specification from "./specification";
import Link from "next/link";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <div className="header-2 h-full">
        <Specification />
        {/* <Header isHomePage={true} /> */}

        {/* <div className=" py-6 md:py-12 h-screen " style={{ backgroundImage: `url('https://scontent.fpnq5-1.fna.fbcdn.net/v/t39.30808-6/305457505_5634651799906538_2520514288025021860_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=19026a&_nc_ohc=-WKj9XvawyQAX-maTFI&_nc_ht=scontent.fpnq5-1.fna&oh=00_AfA1cTDYiySkge7v7015V0Gw-3AWKUR6t1IuKZ3szaghGg&oe=63D691AA')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: "650px" }}>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-medium mb-2 text-white py-10">Start By Clicking On START DESIGN.</h1>
            <Link href={'/specification'} className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-xl mt-6">Start Design</Link>
          </div>
        </div> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}

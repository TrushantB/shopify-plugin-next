import navneet from "@/public/navneet.jpeg";
import Image from "next/image";
import Header from "@/components/header";
import Specification from "./specification";
import Link from "next/link";
import Footer from "@/components/footer";
import Script from "next/script";
export default function Home() {
  return (
    <>
      <div className="header-2 h-full">
        <Specification />
      </div>
    </>
  );
}

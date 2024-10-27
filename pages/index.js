import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div style={{
      backgroundImage:"url(/bgimage2.jpg)",
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat"
    }} className="w-screen  md:h-screen h-screen py-10 flex flex-col md:justify-center justify-start md:mt-0">
      <p className="self-center text-[#e63b80]  font-bold text-3xl text-center md:text-8xl mt-52 md:mt-0">
        Tired of <br /> <strong>Masturabation</strong>?{" "}
      </p>
      <p className="self-center mt-2 md:text-3xl  font-extrabold text-[#ffffff]">Try Something New</p>
      <p className="self-center mt-2  md:text-3xl font-extrabold text-[#f6f6f6]">Have Some Fun</p>
<Link className="self-center" href={'/CompareModels'}>
<button className="py-4 px-10 bg-[#e63b80] font-bold md:px-20 w-fit self-center rounded-xl active:scale-95 transition-all duration-100 active:bg-[#830f3e] mt-5 md:mt-12"> Go to Page </button>

</Link>    </div>
  );
}

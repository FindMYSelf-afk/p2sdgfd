import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowUp } from "react-icons/fa6";
import Head from "next/head";
const Loader = () => (
  <>
    <div className="spinner self-center">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p className="text-[#e63b80] font-extrabold loading-text">
      Loading New Baddie
    </p>
  </>
);

const CompareModels = () => {
  const [urls, setUrls] = useState({
    url1: "/url22.jpg",
    url2: "/url22.jpg",
  });
  const [win, setWin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState({ score1: 0, score2: 0 });
  const [scoreHidden, setScoreHidden] = useState(true);
  const [jump, setJump] = useState(false);
  const [index, setIndex] = useState(0);

  const generateWinningScore = () => {
    return Math.floor(Math.random() * (10000000 - 6000000 + 1)) + 6000000;
  };

  const router = useRouter();

  const handleImage = async (index) => {
    setScoreHidden(true);
    setLoading(true);

    try {
      const res = await fetch("/api/getimage");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const path = await res.json();

      if (path && path.base64) {
        const base64Image = `data:image/jpg;base64,${path.base64}`;
        if (index === 1) {
          setUrls((prev) => ({ ...prev, url1: base64Image }));
          setScores((prevScores) => ({
            score1: generateWinningScore(),
            score2: prevScores.score2,
          }));
        } else {
          setUrls((prev) => ({ ...prev, url2: base64Image }));
          setScores((prevScores) => ({
            score1: prevScores.score1,
            score2: generateWinningScore(),
          }));
        }
      } else {
        console.error("Invalid response structure:", path);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleImage(1);
    handleImage(2);
  }, []);

  const handleVote = async (index) => {
    const clickedScore = index === 1 ? scores.score1 : scores.score2;
    const otherScore = index === 1 ? scores.score2 : scores.score1;
    setIndex(index);

    if (clickedScore < otherScore) {
      const newScore = otherScore + Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

      setScores((prevScores) => ({
        score1: index === 1 ? newScore : prevScores.score1,
        score2: index === 2 ? newScore : prevScores.score2,
      }));

      setWin((prev) => prev + 1);
      if (win === 12) {
        alert("Your Votes less :(");
        router.push("/");
      }
    }

    setScoreHidden(false);
    setJump(true);

    setUrls((prev) => ({
      ...prev,
      [index === 1 ? "url1" : "url2"]: "/url2.jpg",
    }));

    setTimeout(async () => {
      await handleImage(index);
      setJump(false);
    }, 2000);
  };

  return (
    <>
    <Head>
      <title>Let's See Your Strength</title>
      <meta name="description" content="Rate Hot and sexy girls online , tired of Masturabation? Do this rating to INcrease your mood ? all hot and sexy naked girls here waiting for you to vote for them. " />
    </Head>

    <div className="w-screen h-screen  flex overflow-x-hidden flex-col md:flex-row bg-white">
      <div
        style={{
          backgroundImage: `url(${urls.url1})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`md:w-1/2 ${index === 1 && jump ? "loading-opacity" : undefined} w-full h-4/6 md:h-full flex flex-col justify-end items-center`}
      >
        <button
          onClick={() => handleVote(1)}
          className="bg-[#e63b80] px-6 md:px-10 py-2 md:py-4 self-center md:mb-10 rounded-xl hover:bg-green-500 transition-all duration-100"
        >
          High
        </button>
      </div>

      <div className="flex flex-col justify-center left-0 right-0 text-center text-white">
        <h2 className="text-center self-center text-nowrap text-[#e63b80] font-extrabold">
          Hotsness Votes
        </h2>
        <div className="flex flex-row gap-2 md:gap-0 md:flex-col justify-center self-center">
          <p className="flex text-black font-semibold flex-row text-nowrap">
            Image 1 Vote:{" "}
            {!scoreHidden && (
              <span className="font-extrabold text-nowrap text-[#e63b80]">
                {(index === 2 || index === 1) && jump && scores.score1}
                {(index === 2 || index === 1) && jump && scores.score1 > scores.score2 && <FaArrowUp className="inline text-2xl mb-2 font-extrabold text-green-500" />}
              </span>
            )}
          </p>
          <p className="flex text-black font-semibold flex-row text-nowrap">
            Image 2 Vote:{" "}
            {!scoreHidden && (
              <span className="font-extrabold text-nowrap text-[#e63b80]">
                {(index === 2 || index === 1) && jump && scores.score2}
                {(index === 2 || index === 1) && jump && scores.score2 > scores.score1 && <FaArrowUp className="inline text-2xl mb-2 font-extrabold text-green-500" />}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={async () => {
            setJump(true);
            setUrls({ url1: "/url2.jpg", url2: "/url2.jpg" }); // Change both images
            setIndex(1);
            await handleImage(1); // Fetch new image for url1
            setIndex(2);
            await handleImage(2); // Fetch new image for url2
            setJump(false);
          }}
          className="px-3 text-nowrap md:px-10 py-2 md:py-4 text-white bg-[#e63b80] w-fit self-center rounded-xl font-semibold my-2"
        >
          Get New
        </button>
      </div>

      <div
        style={{
          backgroundImage: `url(${urls.url2})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`md:w-1/2 ${index === 2 && jump ? "loading-opacity" : undefined} w-full h-1/2 md:h-full border-r-2 border-black flex flex-col justify-end items-center`}
      >
        <button
          onClick={() => handleVote(2)}
          className="bg-[#e63b80] px-6 md:px-10 py-2 md:py-4 self-center md:mb-10 rounded-xl hover:bg-green-500 transition-all duration-100"
        >
          High
        </button>
      </div>
    </div>
    </>
  );
};

export default CompareModels;

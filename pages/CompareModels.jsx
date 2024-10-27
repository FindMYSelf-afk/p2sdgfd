import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation

// Simple Loader Component
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
  <p className="text-[#e63b80] font-extrabold loading-text">Loading New Baddie</p>
  </>
);

const CompareModels = () => {
  const [urls, setUrls] = useState({
    url1: "/url3.png", // Default image
    url2: "/url3.png", // Default image
  });
  const [win, setWin] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading state
  const [scores, setScores] = useState({ score1: 0, score2: 0 }); // Store scores
  const [scoreHidden, setScoreHidden] = useState(true); // Control score visibility

  const generateWinningScore = () => {
    return Math.floor(Math.random() * (10000000 - 6000000 + 1)) + 6000000; // Higher range for winning
  };

  const router = useRouter();

  const handleImage = async (index) => {
    setLoading(true); // Set loading to true when fetching images
    setScoreHidden(true); // Hide scores when fetching new images

    try {
      const res = await fetch("/api/getimage");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const path = await res.json();

      if (path && path.base64) {
        const base64Image = `data:image/png;base64,${path.base64}`; // Add correct prefix for PNG

        if (index === 1) {
          setUrls((prev) => ({ ...prev, url1: base64Image })); // Update url1
          // Generate new scores only for the clicked image
          setScores((prevScores) => ({
            score1: generateWinningScore(),
            score2: prevScores.score2, // Keep the existing score2
          }));
        } else {
          setUrls((prev) => ({ ...prev, url2: base64Image })); // Update url2
          // Generate new scores only for the clicked image
          setScores((prevScores) => ({
            score1: prevScores.score1, // Keep the existing score1
            score2: generateWinningScore(),
          }));
          setLoading(false)
        }
      } else {
        console.error("Invalid response structure:", path);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    handleImage(1);
    handleImage(2);
  }, []); // Run only once on mount

  const handleVote = (index) => {
    const clickedScore = index === 1 ? scores.score1 : scores.score2;
    const otherScore = index === 1 ? scores.score2 : scores.score1;

    if (clickedScore < otherScore) {
      setWin((prev) => prev + 1);
      if (win === 5) {
        alert("Your Votes less :( ");
        router.push("/");
      }
    }

    // Show scores for 3 seconds before loading new images
    setScoreHidden(false); // Show scores immediately
    setTimeout(() => {
      handleImage(index); // Load new image after 3 seconds
      setScoreHidden(true); // Hide scores again
    }, 3000);
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-black">
      <div
        style={{
          backgroundImage: `url(${urls.url1})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="md:w-1/2 w-full h-1/2 md:h-full border-r-2 border-black flex flex-col justify-end items-center">
        <button
          onClick={() => handleVote(1)}
          className="bg-red-500 px-10 py-4 self-center md:mb-10 rounded-xl hover:bg-green-500 transition-all duration-100">
          High
        </button>
      </div>

      <div className="flex flex-col justify-center left-0 right-0 text-center text-white">
        <h2 className="text-center self-center text-nowrap text-[#e63b80] font-extrabold">
          Hotsness Votes
        </h2>
        {!scoreHidden && (
          <div className="flex flex-col justify-center self-center">
            <p className="flex flex-row text-nowrap">
              Image 1 Vote: <span className="indent-3 font-extrabold text-nowrap text-[#e63b80]">{scores.score1}</span>
            </p>
            <p className="flex flex-row text-nowrap">
              Image 2 Vote: <span className="indent-3 font-extrabold text-nowrap text-[#e63b80]">{scores.score2}</span>
            </p>
            {!loading && <Loader />} {/* Show loader if loading */}
          </div>
        )}
      </div>

      <div
        style={{
          backgroundImage: `url(${urls.url2})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="md:w-1/2 w-full h-1/2 md:h-full border-l-2 border-black flex flex-col justify-end items-center">
        <button
          onClick={() => handleVote(2)}
          className="bg-red-500 px-10 py-4 self-center md:mb-10 rounded-xl hover:bg-green-500 transition-all duration-100">
          High
        </button>
      </div>
    </div>
  );
};

export default CompareModels;

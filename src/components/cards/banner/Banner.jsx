import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BannerDescription from "./BannerDescription";
import BannerButtons from "./BannerButtons";
import ImageCover from "../../ImageCover";

export default function Banner({ apiUrl }) {
  const [animRight, setAnimRight] = useState(false);
  const [animLeft, setAnimLeft] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [currentAnimeNumber, setCurrentAnimeNumber] = useState(0);
  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await fetch(`${apiUrl}/trending/anime`);
        if (response.ok) {
          const json = await response.json();
          setAnimeList(json.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getBanner();
  }, [apiUrl]);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimLeft(true);
      setCurrentAnimeNumber((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= animeList.length) nextIndex = 0;
        return nextIndex;
      });
      setTimeout(() => {
        setAnimLeft(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  });
  function handleRightClick() {
    setAnimRight(true);
    setCurrentAnimeNumber((prevIndex) => {
      let nextIndex = prevIndex + 1;
      if (nextIndex >= animeList.length) {
        nextIndex = 0;
      }
      setTimeout(() => {
        setAnimRight(false);
      }, 1000);
      return nextIndex;
    });
  }
  function handleLeftClick() {
    setAnimLeft(true);
    setCurrentAnimeNumber((prevIndex) => {
      let nextIndex = prevIndex - 1;
      if (nextIndex === -1) {
        nextIndex = animeList.length - 1;
      }
      setTimeout(() => {
        setAnimLeft(false);
      }, 1000);
      return nextIndex;
    });
  }
  const currentAnime = animeList[currentAnimeNumber];
  return (
    <>
      {animeList &&
      animeList.length > 0 &&
      currentAnime &&
      currentAnime.attributes ? (
        <div
          className={`relative w-screen h-150 overflow-hidden -translate-y-20 ${
            animRight ? "right-slide" : ""
          } ${animLeft ? "left-slide" : ""} max-xl:h-100  `}
        >
          <img
            className="object-cover w-full h-full "
            src={currentAnime?.attributes?.coverImage?.large}
            alt=""
          />
          <ImageCover />
          <BannerDescription currentAnime={currentAnime} />
          <BannerButtons
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
          />
        </div>
      ) : (
        <div className="loaded relative w-screen h-150 overflow-hidden -translate-y-20 bg-gray-800 animate-pulse">
          <ImageCover />

        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaVideo,
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { AiFillFastForward, AiOutlineLoading3Quarters } from "react-icons/ai";
import ModalAnime from "../../../components/modals/ModalAnime";
import Header from "../../../components/layout/header/Header";
export default function Page() {
  const [animeList, setAnimeList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [animRight, setAnimRight] = useState(false);
  const [animLeft, setAnimLeft] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [currentAnimeNumber, setCurrentAnimeNumber] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;
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
    setModalClose(true);
  }, []);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/anime?filter[status]=current&page[limit]=20&page[offset]=0&sort=-userCount`
        );
        if (response.ok) {
          const json = await response.json();
          setTrendingList(json.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getTrending();
  }, []);

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
  useEffect(() => {
    if (modal) {
      document.querySelector("body").classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
  }, [modal]);
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
  function handleModalClick(element) {
    setSelectedAnime(element);
    setModal(true);
    setTimeout(() => {
      setModalClose(false);
    }, 1);
  }
  const currentAnime = animeList[currentAnimeNumber];
  return (
    <>
      <Header page={"home"} />
      <div
        className={`relative w-screen h-150 overflow-hidden bottom-20 ${
          animRight ? "right-slide" : ""
        } ${animLeft ? "left-slide" : ""} max-xl:h-100  `}
      >
        <img
          className="object-cover w-full h-full "
          src={currentAnime?.attributes?.coverImage?.large}
          alt=""
        />
        <div className=" max-x:flex max-x:flex-col max-x:justify-center max-x:items-center max-x:gap-3 absolute inset-0 bg-gray-950/50 ">
          {animeList &&
          animeList.length > 0 &&
          currentAnime &&
          currentAnime.attributes ? (
            <>
              <div className="flex flex-col justify-center items-center ml-5 mt-80 bg-black/50 text-white p-2 rounded-2xl h-60 w-200 max-xl:mt-30 max-xl:w-125 max-md:w-100 max-sm:w-75 max-sm:ml-1 max-x:mt-15">
                <h1 className="text-4xl font-bold max-xl:text-2xl max-sm:text-lg">
                  {currentAnime.attributes.titles.en
                    ? currentAnime.attributes.titles.en
                    : currentAnime.attributes.titles.en_jp}
                </h1>
                <hr className="w-full" />
                <div className="flex justify-center items-center gap-2 w-150 text-orange-500  font-medium ">
                  <span className="flex justify-center items-center gap-1">
                    <FaPlay />
                    <h1>
                      {currentAnime.attributes.subtype[0].toUpperCase()}
                      {currentAnime.attributes.subtype.slice(1, 5)}
                    </h1>
                  </span>
                  <span className="flex justify-center items-center gap-1">
                    <FaCalendar />
                    <h1>{currentAnime.attributes.startDate}</h1>
                  </span>
                  {currentAnime.attributes.episodeCount ? (
                    <span className="flex justify-center items-center gap-1">
                      <AiFillFastForward className="text-2xl" />
                      <h1>{currentAnime.attributes.episodeCount}</h1>
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="flex justify-center items-center gap-1">
                    <FaClock />
                    <h1>{currentAnime.attributes.episodeLength}m</h1>
                  </span>
                </div>
                <h1 className="w-100 font-medium max-sm:text-sm text-center max-sm:w-50">
                    {window.screen.width<768?(
                      currentAnime.attributes.description.slice(0, 100)
                    ):currentAnime.attributes.description.slice(0, 200)}...
                </h1>
                <div className="flex justify-center items-center gap-3 mt-1 max-sm:flex-col">
                  <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 max-xl:p-1 max-sm:w-40">
                    <FaVideo />
                    <a
                      target="blanc"
                      href={`https://www.youtube.com/watch?v=${currentAnime.attributes.youtubeVideoId}`}
                    >
                      Watch Trailer
                    </a>
                  </button>
                  <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 max-xl:p-1 max-sm:w-45">
                    <FaInfoCircle />
                    <a
                      href={`/info?q=${currentAnime.attributes.canonicalTitle}`}
                    >
                      View Anime Info
                    </a>
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center z-1001 gap-3 relative bottom-15 left-[35%] text-2xl max-x:left-0 max-x:bottom-0 ">
                <button
                  className="py-4 px-3 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer xl:py-5 xl:px-4 max-sm:py-2.5 max-sm:px-2 max-x:px-1 max-x:py-1"
                  onClick={handleLeftClick}
                >
                  <FaArrowLeft className="text-amber-600 " />
                </button>
                <button
                  className="py-4 px-3 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer xl:py-5 xl:px-4 max-sm:py-2.5 max-sm:px-2 max-x:px-1 max-x:py-1"
                  onClick={handleRightClick}
                >
                  <FaArrowRight className="text-amber-600" />
                </button>
              </div>
            </>
          ) : (
            <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
              <h1 className=" r">Anime Data Is Loading</h1>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </span>
          )}
        </div>
      </div>
      <main>
        <div className="ml-5 relative bottom-15 flex flex-col max-lg:ml-1 ">
          <h1 className="text-white text-5xl font-medium mb-5 max-xl:text-3xl  ">
            Trending Anime
          </h1>
          <ul className="grid grid-cols-10 gap-2  justify-center items-center trending-list max-2xl:grid-cols-5 max-lg:grid-cols-4  max-md:grid-cols-3 max-s:grid-cols-2 ">
            {trendingList && trendingList.length > 0 ? (
              trendingList.map((element) => {
                return (
                  <li key={element.id}>
                    <div
                      className="flex flex-col justify-center items-center transition-transform hover:scale-110 cursor-pointer"
                      onClick={() => handleModalClick(element)}
                    >
                      <span className="flex flex-col items-start justify-center">
                        <img
                          className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55"
                          src={element.attributes.posterImage.original}
                          alt="posterImage"
                        />
                        <h1 className="text-lg text-center text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {element.attributes.canonicalTitle.length > 15
                            ? element.attributes.canonicalTitle.slice(0, 15) +
                              "..."
                            : element.attributes.canonicalTitle}
                        </h1>
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
                <h1 className=" r">Anime Data Is Loading</h1>
                <AiOutlineLoading3Quarters className="animate-spin" />
              </span>
            )}
          </ul>
        </div>
        {modal ? (
          <div className={`bg-black/60 inset-0 fixed duration-50 transition-opacity z-1003 ${modalClose?"opacity-0":"opacity-100"}`}>
            <div
              onClick={() => {
                setModalClose(true);
                setTimeout(() => {
                  setModal(false);
                }, 100);
              }}
              className={`fixed inset-0 flex justify-center items-center 0 z-1001 transition-transform ${
                modalClose ? "scale-0" : "scale-100"
              }`}
            >
              <ModalAnime anime={selectedAnime} />
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

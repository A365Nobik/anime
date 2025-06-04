import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiFillFastForward } from "react-icons/ai";
import { FaSearch, FaCalendar, FaClock, FaPlay } from "react-icons/fa";
import netflix from "../../assets/stream-icons/netflix.svg";
import hulu from "../../assets/stream-icons/hulu.svg";
import crunchyroll from "../../assets/stream-icons/crunchyroll.svg";
import youtube from "../../assets/stream-icons/youtube.svg";
export default function Info() {
  const [searchParams] = useSearchParams();
  const [anime, setAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const inputRef = useRef(null);
  let navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [headerBg, setHeaderBg] = useState(false);
  const [steamLinks, setStreamLinks] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [page,setPage]= useState({
    details:true,
    episodes:false,
    characters:false
  })
  useEffect(() => {
    const getAnimeInfo = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/anime?filter[text]=${searchParams.get("q")}`
        );
        if (response.ok) {
          const json = await response.json();
          setAnime(json.data[0]);
        }
      } catch (error) {
        alert(error);
      }
    };
    getAnimeInfo();
    document.querySelector("body").classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (anime) {
      const onlineLinks = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/anime/${anime?.id}/streaming-links`
          );
          if (response.ok) {
            const json = await response.json();
            setStreamLinks(json.data);
          }
        } catch (error) {
          alert(error);
        }
      };
      onlineLinks();
    }
  }, [anime]);
  useEffect(() => {
    if (anime) {
      const getEpisodes = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/anime/${anime.id}/episodes?page[offset]=0&page[limit]=20`
          );
          if (response.ok) {
            const json = await response.json();
            setEpisodes(json.data);
          }
        } catch (error) {
          alert(error);
        }
      };
      getEpisodes();
    }
  }, [anime]);
  function iconName(url) {
    const hostUrl = new URL(url).hostname.replace("www.", "");
    let serviceName = hostUrl.split(".")[0];
    switch (serviceName) {
      case "netflix": {
        return netflix;
      }
      case "hulu": {
        return hulu;
      }
      case "crunchyroll": {
        return crunchyroll;
      }
      case "youtube": {
        return youtube;
      }
    }
  }

  async function findAnimeName() {
    const value = inputRef.current.value;
    try {
      const response = await fetch(`${apiUrl}/anime?filter[text]=${value}`);
      if (response.ok) {
        const json = await response.json();
        navigate(`/result?q=${encodeURIComponent(value)}`, {
          state: {
            searchData: json.data,
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  }
  console.log(anime);
  console.log(steamLinks);
  console.log(episodes);
  return (
    <>
      <header
        onMouseEnter={() => setHeaderBg(true)}
        onMouseLeave={() => setHeaderBg(false)}
        className={` sticky flex  justify-between items-center w-full p-4 text-[#EAEFEF] z-1000 transition-colors ${
          headerBg ? " bg-gray-800" : ""
        } `}
      >
        <h1 className="text-4xl font-medium text-center">
          Info About {searchParams.get("q")}
        </h1>
        <a className="text-4xl font-medium" href="/">
          Home
        </a>
        <div className="flex justify-center items-center">
          <h1 className="mr-10 text-3xl font-medium">Search An Anime</h1>
          <div
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`flex justify-center items-center gap-2 ${
              focus ? " bg-[#F5C45E]" : " bg-orange-500"
            }  p-1 text-3xl rounded-lg transition-colors`}
          >
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  findAnimeName();
                }
              }}
              ref={inputRef}
              type="text"
              placeholder="Anime Name"
              className="outline-0 w-200 bg-[#EAEFEF] p-0.5 placeholder:text-[#333446] text-[#333446] placeholder:font-medium font-medium focus:border-purple-500  rounded-sm"
            />
            <button
              onClick={findAnimeName}
              className="hover:scale-110 active:scale-90 transition-transform "
            >
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative w-screen h-[450px] overflow-hidden bottom-20">
        <img
          className="object-cover w-full h-full"
          src={anime?.attributes?.coverImage?.large}
          alt=""
        />
        <div className="absolute inset-0 bg-gray-950/50"></div>
      </div>
      {anime ? (
        <>
          <main>
            <div className="flex justify-center items-center relative bottom-20 text-white ">
              <span className="border-t-0 border-2 rounded-br-lg rounded-bl-lg p-1 ">
                <h1 className="text-4xl    font-bold">
                  {anime?.attributes?.canonicalTitle}
                </h1>
              </span>
            </div>
            <div className="flex justify-start gap-1">
              <div className="flex justify-start items-start ml-5 relative bottom-40">
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="rounded-md"
                    src={anime.attributes.posterImage.small}
                    alt=""
                  />
                  {steamLinks && steamLinks.length > 0 ? (
                    <div className="flex flex-col justify-center items-center">
                      <hr className="  w-70 text-white mt-2" />
                      <h1 className="text-white font-medium text-lg">
                        Watch Online
                      </h1>
                      <ul className="flex justify-center items-center gap-1">
                        {anime && steamLinks && steamLinks.length > 0 ? (
                          <>
                            {steamLinks.map((element) => {
                              return (
                                <li key={element.id}>
                                  <div className="bg-white rounded-md p-1 transition-transform hover:scale-110 active:scale-90">
                                    <a
                                      href={element.attributes.url}
                                      target="blanc"
                                    >
                                      <img
                                        className="w-8 h-8"
                                        src={iconName(element.attributes.url)}
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                </li>
                              );
                            })}
                          </>
                        ) : (
                          <span className="flex justify-center items-center text-3xl text-white font-bold mt-10 gap-2">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          </span>
                        )}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="w-[500px]  border-2 border-gray-600 rounded-lg relative bottom-15">
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-2xl text-white font-medium">Details</h1>
                  <hr className="w-full text-gray-600" />
                </div>
                <ul className="flex flex-col gap-4 justify-start items-start">
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">English Title</h1>
                    <h1 className="flex-1">{anime.attributes.titles.en}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Japan Title</h1>
                    <h1 className="flex-1">{anime.attributes.titles.ja_jp}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Japan Title (Romaji)</h1>
                    <h1 className="flex-1">{anime.attributes.titles.en_jp}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Show Type</h1>
                    <h1 className="flex-1">{anime.attributes.showType}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Came Out At</h1>
                    <h1 className="flex-1">{anime.attributes.startDate}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Average Rating</h1>
                    <h1 className="flex-1">{anime.attributes.averageRating}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Age Rating Guide</h1>
                    <h1 className="flex-1">
                      {anime.attributes.ageRatingGuide}
                    </h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Episode Count</h1>
                    <h1 className="flex-1">{anime.attributes.episodeCount}</h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Episode Length</h1>
                    <h1 className="flex-1">
                      {anime.attributes.episodeLength} m
                    </h1>
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    <h1 className="w-48">Status</h1>
                    <h1 className="flex-1">
                      {anime.attributes.status[0].toUpperCase()}
                      {anime.attributes.status.slice(1, 10)}
                    </h1>
                  </li>
                </ul>
              </div>
              <div className="w-[500px]  border-2 border-gray-600 rounded-lg relative bottom-15 ">
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-2xl text-white font-medium">Episodes</h1>
                  <hr className="w-full text-gray-600" />
                </div>
                <ul className="grid grid-5 justify-center items-center  overflow-y-auto h-[400px] ">
                  {anime && episodes && episodes.length > 0 ? (
                    episodes.map((element) => {
                      return (
                        <>
                          <img
                            loading="lazy"
                            className="scale-80"
                            src={element.attributes.thumbnail.original}
                            alt="episode poster"
                          />
                        </>
                      );
                    })
                  ) : (
                    <span className="flex justify-center items-center text-3xl text-white font-bold mt-10 gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </span>
                  )}
                </ul>
              </div>
            </div>
          </main>
        </>
      ) : (
        <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
          <h1 className=" r">Anime Data Is Loading</h1>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </span>
      )}
    </>
  );
}

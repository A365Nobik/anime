import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiFillFastForward } from "react-icons/ai";
import { FaSearch, FaCalendar, FaClock, FaPlay } from "react-icons/fa";

import undefinedCharacter from "../../../public/undefined.png";
export default function Info() {
  const [searchParams] = useSearchParams();
  const [anime, setAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const inputRef = useRef(null);
  let navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [headerBg, setHeaderBg] = useState(false);
  const [moreEpisodesLoaded, setMoreEpisodesLoaded] = useState(false);
  const [steamLinks, setStreamLinks] = useState([]);
  let [episodes, setEpisodes] = useState([]);
  let [offset, setOffset] = useState(0);
  let [characters, setCharacters] = useState([]);
  let [charactersCard, setCharactersCard] = useState([]);

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
            `${apiUrl}/anime/${anime.id}/episodes?page[offset]=${offset}&page[limit]=20`
          );
          if (response.ok) {
            const json = await response.json();
            if (json.data.length === 0) {
              setMoreEpisodesLoaded(true);
            } else {
              if (offset >= 20) {
                setEpisodes((prev) => prev.concat(json.data));
              } else {
                setEpisodes(json.data);
              }
            }
          }
        } catch (error) {
          alert(error);
        }
      };
      getEpisodes();
    }
  }, [anime, offset]);
  useEffect(() => {
    if (anime) {
      const getCharacters = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/anime/${anime.id}/characters?page[offset]=0&page[limit]=20`
          );
          if (response.ok) {
            const json = await response.json();
            setCharacters(json.data);
          }
        } catch (error) {
          alert(error);
        }
      };
      getCharacters();
    }
  }, [anime]);
  useEffect(() => {
    if (anime && characters && characters.length > 0) {
      const getCharactersCard = async () => {
        characters.map(async (element) => {
          const response = await fetch(
            `${element.relationships.character.links.related}`
          );
          if (response.ok) {
            const json = await response.json();
            setCharactersCard((prev) => prev.concat(json.data));
          }
        });
      };
      getCharactersCard();
    }
  }, [characters]);
  function iconName(url) {
    try {
      const hostUrl = new URL(url).hostname.replace("www.", "");
      let serviceName = hostUrl.split(".")[0];
      switch (serviceName) {
        case "netflix": {
          return "https://www.svgrepo.com/show/303341/netflix-1-logo.svg";
        }
        case "hulu": {
          return "https://www.svgrepo.com/show/303524/hulu-logo.svg";
        }
        case "crunchyroll": {
          return "https://www.svgrepo.com/show/343546/crunchyroll-network-connection-communication-interaction.svg";
        }
        case "youtube": {
          return "https://www.svgrepo.com/show/475700/youtube-color.svg";
        }
        case "amazon": {
          return "https://www.svgrepo.com/show/463913/amazon.svg";
        }
        case "hidive": {
          return "https://static.wikia.nocookie.net/enanimanga/images/4/47/HIDIVE_logo.png/revision/latest?cb=20190703062203";
        }
        case "funimation": {
          return "https://www.svgrepo.com/show/343546/crunchyroll-network-connection-communication-interaction.svg";
        }
        case "contv": {
          return "https://cdn2.downdetector.com/static/uploads/logo/CONtv.png";
        }
        case "animelab": {
          return "https://img.icons8.com/?size=512&id=ImtaJYOCNBG4&format=png";
        }
        case "tubitv":{
          return "https://www.logo.wine/a/logo/Tubi/Tubi-Logo.wine.svg"
        }
      }
    } catch (error) {
      console.log(error);
      return "https://www.svgrepo.com/show/459055/error-outline.svg";
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
  console.log(characters);
  console.log(charactersCard);
  return (
    <>
      <header
        onMouseEnter={() => setHeaderBg(true)}
        onMouseLeave={() => setHeaderBg(false)}
        className={` sticky flex  justify-between items-center w-full p-4 text-[#EAEFEF] z-1000 transition-colors duration-500  delay-100 ${
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
                                  <div className="bg-white rounded-md  transition-transform hover:scale-110 active:scale-90">
                                    <button className="flex justify-center items-center p-1">
                                      <a
                                        href={element.attributes.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          className="w-8 h-8"
                                          src={iconName(element.attributes.url)}
                                        />
                                      </a>
                                    </button>
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
                    {anime.attributes.startDate ? (
                      <>
                        <h1 className="w-48">Came Out At</h1>
                        <h1 className="flex-1">{anime.attributes.startDate}</h1>
                      </>
                    ) : (
                      <>
                        <h1 className="w-48">Came Out At</h1>
                        <h1 className="flex-1">Undefined</h1>
                      </>
                    )}
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    {anime.attributes.averageRating ? (
                      <>
                        <h1 className="w-48">Average Rating</h1>
                        <h1 className="flex-1">
                          {Math.round(anime.attributes.averageRating)}
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="w-48">Average Rating</h1>
                        <h1 className="flex-1">Undefined</h1>
                      </>
                    )}
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    {anime.attributes.ageRatingGuide ? (
                      <>
                        <h1 className="w-48">Age Rating Guide</h1>
                        <h1 className="flex-1">
                          {anime.attributes.ageRatingGuide}
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="w-48">Age Rating Guide</h1>
                        <h1 className="flex-1">Undefined</h1>
                      </>
                    )}
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    {anime.attributes.episodeCount ? (
                      <>
                        <h1 className="w-48">Episode Count</h1>
                        <h1 className="flex-1">
                          {anime.attributes.episodeCount}
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="w-48">Episode Count</h1>
                        <h1 className="flex-1">Undefined</h1>
                      </>
                    )}
                  </li>
                  <li className="flex  items-center text-white font-medium text-lg ml-2 gap-4 text-left">
                    {anime.attributes.episodeLength ? (
                      <>
                        <h1 className="w-48">Episode Length</h1>
                        <h1 className="flex-1">
                          {anime.attributes.episodeLength} m
                        </h1>
                      </>
                    ) : (
                      <>
                        <h1 className="w-48">Episode Length</h1>
                        <h1>Undefined</h1>
                      </>
                    )}
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
                <ul className="grid grid-5 justify-center items-center  overflow-y-auto h-[500px] gap-2 p-1 ">
                  {anime && episodes ? (
                    episodes.map((element) => {
                      return (
                        <>
                          <li
                            key={element.id}
                            className="border-2 rounded-md border-white flex flex-col justify-center items-center p-1"
                          >
                            {element?.attributes?.thumbnail ? (
                              <>
                                <h1 className="text-white font-medium text-lg">
                                  Episode №{element.attributes.number}
                                </h1>
                                <img
                                  className=" object-cover rounded-md w-[400px] h-[250px]"
                                  loading="lazy"
                                  src={element?.attributes?.thumbnail?.original}
                                  alt={`Episode ${element.attributes.number} With Poster`}
                                />
                                <h1 className="text-white font-medium text-lg text-center">
                                  {element.attributes.canonicalTitle}
                                </h1>
                              </>
                            ) : (
                              <>
                                <h1 className="text-white font-medium text-lg">
                                  Episode №{element.attributes.number}
                                </h1>
                                <img
                                  loading="lazy"
                                  className=" object-cover w-[400px] h-[250px] rounded-md "
                                  src={anime.attributes.posterImage.original}
                                  alt={`Episode №${element.attributes.number} Without Poster`}
                                />
                                <h1 className="text-white font-medium text-lg text-center">
                                  {element.attributes.canonicalTitle}
                                </h1>
                              </>
                            )}
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <span className="flex justify-center items-center text-3xl text-white font-bold mt-10 gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </span>
                  )}
                  <span className="flex justify-center items-center">
                    {moreEpisodesLoaded === false ? (
                      <button
                        onClick={() => {
                          setOffset((prev) => prev + 20);
                          console.log(offset);
                        }}
                        className=" bg-orange-500 w-2/4 p-1 rounded-2xl   font-medium transition-transform hover:scale-110 active:scale-90 text-white"
                      >
                        Load More Episodes
                      </button>
                    ) : (
                      ""
                    )}
                  </span>
                </ul>
              </div>
              <div className="w-[1000px]  border-2 border-gray-600 rounded-lg relative bottom-15 ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl text-white font-medium">
                    Characters
                  </h1>
                  <hr className="w-full text-gray-600" />
                </div>
                {characters.length === 0 || charactersCard.length === 0 ? (
                  <span className="flex flex-col justify-center items-center text-3xl text-white font-bold  gap-2">
                    <h1 className="text-center">
                      Loading Anime Data Or Characters For This Anime Are
                      Missing
                    </h1>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </span>
                ) : (
                  ""
                )}
                <ul className="grid grid-cols-5 justify-center items-center  overflow-y-auto h-[500px] gap-2 p-1">
                  {anime && characters && characters.length > 0
                    ? charactersCard.map((element) => {
                        return (
                          <>
                            <li
                              key={element.id}
                              className="h-[325px] border-2 border-white flex flex-col justify-center items-center p-1  rounded-lg"
                            >
                              {element?.attributes?.image?.original ? (
                                <img
                                  className="object-cover rounded-md w-[220px] h-[250px]"
                                  loading="lazy"
                                  src={element?.attributes?.image?.original}
                                  alt={`Character:${element?.attributes?.canonicalName} Id:${element?.id}`}
                                />
                              ) : (
                                <img
                                  className="object-cover [220px] h-[250px]"
                                  src={undefinedCharacter}
                                  alt={`Undefined Character:${element?.attributes?.canonicalName} id:${element?.id}`}
                                />
                              )}
                              <h1 className="text-white font-medium text-lg text-center">
                                {element?.attributes?.canonicalName}
                              </h1>
                            </li>
                          </>
                        );
                      })
                    : ""}
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

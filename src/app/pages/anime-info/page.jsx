import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../../../components/layout/header/Header";
import { FaArrowRight, FaArrowLeft, FaVideo } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import Description from "../../../components/modals/Description";
import Trailer from "../../../components/modals/Trailer";
export default function Info() {
  const [searchParams] = useSearchParams();
  const [anime, setAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [moreEpisodesLoaded, setMoreEpisodesLoaded] = useState(false);
  const [moreCharactersLoaded, setMoreCharactersLoaded] = useState(false);
  const [modalDescription, setModalDescription] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(false);
  const [steamLinks, setStreamLinks] = useState([]);
  let [episodes, setEpisodes] = useState([]);
  let [offsetEpisodes, setOffsetEpisodes] = useState(0);
  let [offsetCharacters, setOffsetCharacters] = useState(0);
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
    setModalClose(true);
    getAnimeInfo();
  }, [searchParams]);
  useEffect(() => {
    if (modalDescription) {
      document.querySelector("body").classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
  }, [modalDescription]);
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
            `${apiUrl}/anime/${anime.id}/episodes?page[offset]=${offsetEpisodes}&page[limit]=20`
          );
          if (response.ok) {
            const json = await response.json();
            if (json.data.length === 0) {
              setMoreEpisodesLoaded(true);
            } else {
              if (offsetEpisodes >= 20) {
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
  }, [anime, offsetEpisodes]);
  useEffect(() => {
    if (anime) {
      const getCharacters = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/anime/${anime.id}/characters?page[offset]=${offsetCharacters}&page[limit]=20`
          );
          if (response.ok) {
            const json = await response.json();
            if (json.data.length === 0) {
              setMoreCharactersLoaded(true);
            } else {
              setMoreCharactersLoaded(false);
              setCharacters(json.data);
            }
          }
        } catch (error) {
          alert(error);
        }
      };
      getCharacters();
    }
  }, [anime, offsetCharacters]);
  useEffect(() => {
    if (anime && characters && characters.length > 0) {
      const getCharactersCard = async () => {
        try {
          const characterPromises = characters.map((element) =>
            fetch(element.relationships.character.links.related)
              .then((response) => response.json())
              .then((json) => json.data)
          );

          const characterData = await Promise.all(characterPromises);
          setCharactersCard(characterData);
        } catch (error) {
          console.error("Error fetching character details:", error);
        }
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
        case "tubitv": {
          return "https://www.logo.wine/a/logo/Tubi/Tubi-Logo.wine.svg";
        }
      }
    } catch (error) {
      console.log(error);
      return "https://www.svgrepo.com/show/459055/error-outline.svg";
    }
  }
  return (
    <>
      <Header page={"info"} />
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
            <div className="flex justify-start gap-2">
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
              <div className="w-[500px]  border-2 border-orange-500 rounded-lg relative bottom-15">
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-2xl text-white font-medium">Details</h1>
                  <hr className="w-full text-orange-500" />
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
                <div className="flex justify-center items-center gap-4 mt-5">
                  {anime.attributes.youtubeVideoId ? (
                    <button
                      onClick={() => {
                        setModalTrailer(true);
                        setTimeout(() => {
                          setModalClose(false);
                        }, 1);
                      }}
                      className="flex justify-center items-center bg-orange-500 p-1 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 text-white"
                    >
                      <FaVideo />
                      Watch Trailer
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="flex justify-center items-center bg-orange-500 p-1 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 text-white"
                    onClick={() => {
                      setModalDescription(true);
                      setTimeout(() => {
                        setModalClose(false);
                      }, 1);
                    }}
                  >
                    <MdOutlineDescription />
                    Read Description
                  </button>
                </div>
              </div>
              <div className="w-[500px]  border-2 border-orange-500 rounded-lg relative bottom-15 ">
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-2xl text-white font-medium">Episodes</h1>
                  <hr className="w-full text-orange-500" />
                </div>
                <div className="grid grid-5 justify-center items-center  overflow-y-auto h-[600px] gap-2 p-1 ">
                  {anime && episodes ? (
                    episodes.map((element) => {
                      return (
                        <div
                          key={element.id}
                          className="border-2 rounded-md border-white flex flex-col justify-center items-center p-1"
                        >
                          {element?.attributes?.thumbnail ? (
                            <>
                              <h1 className="text-white font-medium text-lg">
                                Episode №{element.attributes.number}
                              </h1>
                              <img
                                className=" object-cover rounded-md w-[450px] h-[250px]"
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
                                className=" object-cover w-[450px] h-[250px] rounded-md "
                                src={anime.attributes.posterImage.original}
                                alt={`Episode №${element.attributes.number} Without Poster`}
                              />
                              <h1 className="text-white font-medium text-lg text-center">
                                {element.attributes.canonicalTitle}
                              </h1>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <span className="flex justify-center items-center text-3xl text-white font-bold mt-10 gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </span>
                  )}
                  <span className="flex justify-center items-center">
                    {moreEpisodesLoaded === false && episodes.length === 20 ? (
                      <button
                        onClick={() => {
                          setOffsetEpisodes((prev) => prev + 20);
                          console.log(offsetEpisodes);
                        }}
                        className=" bg-orange-500 w-2/4 p-1 rounded-2xl   font-medium transition-transform hover:scale-110 active:scale-90 text-white cursor-pointer"
                      >
                        Load More Episodes
                      </button>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
              <div className="w-[1000px]  border-2 border-orange-500 rounded-lg relative bottom-15 ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl text-white font-medium">
                    Characters
                  </h1>
                  <hr className="w-full text-orange-500" />
                </div>
                <div>
                  <div
                    className={`grid ${
                      charactersCard.length === 0 ? "" : "grid-cols-5"
                    } justify-center items-center  overflow-y-auto  h-[600px] gap-2 p-1`}
                  >
                    {characters.length === 0 || charactersCard.length === 0 ? (
                      <div className="flex justify-center items-center text-2xl text-white font-bold  gap-2 h-max">
                        <h1 className="text-center">
                          Loading Anime Data Or Characters For This Anime Are
                          Missing
                        </h1>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      </div>
                    ) : (
                      ""
                    )}
                    {anime && characters && characters.length > 0
                      ? charactersCard.map((element) => {
                          return (
                            <div
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
                                  src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                                  alt={`Undefined Character:${element?.attributes?.canonicalName} id:${element?.id}`}
                                />
                              )}
                              <h1 className="text-white font-medium text-lg text-center">
                                {element?.attributes?.canonicalName}
                              </h1>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                  <hr className="w-full text-orange-500 my-1" />
                  <div className="flex justify-center items-center gap-2">
                    <button
                      disabled={offsetCharacters === 0}
                      onClick={() => {
                        setOffsetCharacters((prev) => prev - 20);
                      }}
                      className="p-1 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer"
                    >
                      <FaArrowLeft className="text-amber-600 " />
                    </button>
                    <button
                      disabled={moreCharactersLoaded}
                      onClick={() => {
                        setOffsetCharacters((prev) => prev + 20);
                      }}
                      className="p-1 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer"
                    >
                      <FaArrowRight className="text-amber-600 " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {modalDescription ? (
              <span
                onClick={() => {
                  setModalClose(true);
                  setTimeout(() => {
                    setModalDescription(false);
                  }, 100);
                }}
                className={`flex justify-center items-center  transition-transform fixed inset-0
                  bg-black/50
            } w-screen h-screen ${modalClose ? "scale-0" : "scale-100"}`}
              >
                <Description
                  description={anime.attributes.description}
                  setModal={setModalDescription}
                  setModalClose={setModalClose}
                />
              </span>
            ) : (
              ""
            )}
            {modalTrailer ? (
              <span
                onClick={() => {
                  setModalClose(true);
                  setTimeout(() => {
                    setModalTrailer(false);
                  }, 100);
                }}
                className={`flex justify-center items-center  transition-transform bg-black/50 z-20 inset-0 fixed ${
                  modalClose ? "scale-0" : "scale-100"
                }`}
              >
                <Trailer
                  trailer={anime.attributes.youtubeVideoId}
                  setModalTrailer={setModalTrailer}
                  setModalClose={setModalClose}
                />
              </span>
            ) : (
              ""
            )}
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

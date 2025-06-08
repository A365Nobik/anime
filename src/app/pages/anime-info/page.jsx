import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../../../components/layout/header/Header";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Description from "../../../components/modals/Description";
import Trailer from "../../../components/modals/Trailer";
import Episode from "../../../components/modals/Episode";
export default function Info() {
  const [searchParams] = useSearchParams();
  const [anime, setAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [moreEpisodesLoaded, setMoreEpisodesLoaded] = useState(false);
  const [moreCharactersLoaded, setMoreCharactersLoaded] = useState(false);
  const [modalDescription, setModalDescription] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(false);
  const [modalEpisode, setModalEpisode] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [steamLinks, setStreamLinks] = useState([]);
  const [detailsCard, setDetailsCard] = useState(true);
  const [episodesCard, setEpisodesCard] = useState(false);
  let [episodes, setEpisodes] = useState([]);
  let [offsetEpisodes, setOffsetEpisodes] = useState(0);

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

  function handleEpisodeClick(element) {
    setSelectedEpisode(element);
    setModalEpisode(true);
    setTimeout(() => {
      setModalClose(false);
    }, 1);
  }
  console.log(anime);
  console.log(episodes);
  return (
    <>
      <Header page={"info"} />
      <div className="relative w-screen h-125 overflow-hidden bottom-20">
        <img
          className="object-cover w-full h-full"
          src={anime?.attributes?.coverImage?.large}
          alt="banner"
        />
        <div className="absolute inset-0 bg-gray-950/50">
          {anime ? (
            <div className="flex flex-col justify-start items-start absolute mt-40 ml-5 bg-black/50 rounded-2xl p-2 gap-1 border-2 border-orange-500 max-2xl:ml-0 max-xl:ml-1 max-y:ml-0">
              <h1 className="text-5xl font-medium text-white max-xl:text-4xl max-lg:text-3xl max-sm:text-2xl max-s:text-xl">
                {anime.attributes.canonicalTitle}
              </h1>
              <hr className="text-white w-full" />
              <div className="flex justify-center items-center gap-1   ">
                <h1 className="text-xl font-medium text-white max-md:text-lg">
                  {window.screen.width<695?anime.attributes.description.slice(0, 40):anime.attributes.description.slice(0, 75)}...
                <a
                  onClick={() => {
                    setModalDescription(true);
                    setTimeout(() => {
                      setModalClose(false);
                    }, 1);
                  }}
                  className="text-white text-xl font-medium transition-colors duration-300 delay-75  hover:text-orange-500 max-md:text-lg"
                  >
                   More
                </a>
                  </h1>
              </div>
              <div className="flex justify-center items-center gap-1">
                <h1 className="text-white font-medium text-xl max-md:text-lg">Show Type:</h1>
                <h1 className="text-white font-medium text-xl max-md:text-lg">
                  {anime.attributes.showType}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-1">
                <h1 className="text-white font-medium text-xl max-md:text-lg">Rating:</h1>
                <h1 className="text-white font-medium text-xl max-md:text-lg">
                  {Math.round(anime.attributes.averageRating)}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-1">
                <h1 className="text-white font-medium text-xl max-md:text-lg">Start Date:</h1>
                <h1 className="text-white font-medium text-xl max-md:text-lg" >
                  {anime.attributes.startDate}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-1">
                <h1 className="text-white font-medium text-xl max-md:text-lg">
                  Start Status:
                </h1>
                <h1 className="text-white font-medium text-xl max-md:text-lg">
                  {anime.attributes.status[0].toUpperCase()}
                  {anime.attributes.status.slice(1, 10)}
                </h1>
              </div>
              <h1
                onClick={() => {
                  setModalTrailer(true);
                  setTimeout(() => {
                    setModalClose(false);
                  }, 1);
                }}
                className="text-white font-medium text-xl transition-colors duration-300 delay-75  hover:text-orange-500 max-md:text-lg"
              >
                Watch Trailer
              </h1>
            </div>
          ) : (
            <span className="flex justify-center items-center text-5xl text-white font-bold mt-20 gap-2">
              <h1 className="">Anime Data Is Loading</h1>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-start items-start gap-5 ml-10">
        <h1 className="text-white font-medium text-2xl">
          Episodes
        </h1>
      </div>
      <div className="flex flex-col justify-start items-center mt-5">
        <ul className="grid justify-center items-center grid-cols-5 overflow-y-auto h-150 gap-1 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {episodes && episodes.length > 0 ? (
            episodes.map((element) => {
              return (
                <li
                  onClick={() => handleEpisodeClick(element)}
                  key={element.id}
                  className="flex flex-col justify-center items-center relative bg-black/50 border-2 border-orange-500 transition-colors hover:border-white duration-250 rounded-lg "
                >
                  <h1 className="text-white font-medium text-md text-center">
                    Episode №{element?.attributes?.number}
                  </h1>
                  {element?.attributes?.thumbnail?.original ? (
                    <img
                      className="object-cover w-full h-80 rounded-md max-lg:w-110  max-md:h-60 max-m:w-90 max-m:h-50"
                      src={element?.attributes?.thumbnail?.original}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-cover w-full h-80 rounded-md"
                      src={anime?.attributes?.posterImage?.original}
                      alt=""
                    />
                  )}
                  <h1 className="text-white font-medium text-md text-center">
                    {element?.attributes?.canonicalTitle?.slice(0, 40)}...
                  </h1>
                  <div className="absolute inset-0 transition-colors  duration-150 hover:bg-gray-950/50"></div>
                </li>
              );
            })
          ) : (
            <span className="flex justify-center items-center text-5xl text-white font-bold mt-20 gap-2">
              <h1 className="">Episodes Is Loading</h1>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </span>
          )}
        </ul>
        {moreEpisodesLoaded || episodes.length < 20 ? (
          ""
        ) : (
          <button
            onClick={() => {
              setOffsetEpisodes((prev) => prev + 20);
            }}
            className="text-white font-medium text-xl bg-orange-500 p-1 rounded-xl my-1"
          >
            Load More Episodes
          </button>
        )}
      </div>
      {modalDescription ? (
        <div
          className={`bg-black/50 inset-0 fixed duration-350 transition-opacity z-1003 ${
            modalClose ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            onClick={() => {
              setModalClose(true);
              setTimeout(() => {
                setModalDescription(false);
              }, 350);
            }}
            className={`fixed inset-0 flex justify-center items-center  z-1001 transition-transform duration-350 delay-75 ${
              modalClose ? "scale-0" : "scale-100"
            }`}
          >
            <Description description={anime.attributes.description} />
          </div>
        </div>
      ) : (
        ""
      )}
      {modalEpisode ? (
        <div
          className={`bg-black/50 inset-0 fixed duration-350 transition-opacity z-1003 ${
            modalClose ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            onClick={() => {
              setModalClose(true);
              setTimeout(() => {
                setModalEpisode(false);
              }, 350);
            }}
            className={`fixed inset-0 flex justify-center items-center  z-1001 transition-transform duration-350 delay-75 ${
              modalClose ? "scale-0" : "scale-100"
            }`}
          >
            <Episode anime={selectedEpisode} animeCard={anime} />
          </div>
        </div>
      ) : (
        ""
      )}
      {modalTrailer ? (
        <div
          className={`bg-black/50 inset-0 fixed duration-350 transition-opacity z-1003 ${
            modalClose ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            onClick={() => {
              setModalClose(true);
              setTimeout(() => {
                setModalTrailer(false);
              }, 350);
            }}
            className={`fixed inset-0 flex justify-center items-center  z-1001 transition-transform duration-350 delay-75 ${
              modalClose ? "scale-0" : "scale-100"
            }`}
          >
            <Trailer trailer={anime.attributes.youtubeVideoId} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

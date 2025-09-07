import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Description from "../../../components/modals/Description";
import Trailer from "../../../components/modals/Trailer";
import Episode from "../../../components/modals/Episode";
import EpisodeCard from "../../../components/cards/episodes/EpisodeCard";
import EpisodeCardLoading from "../../../components/cards/episodes/EpisodeCardLoading";
import InfoCard from "../../../components/cards/info/InfoCard";
import InfoCardLoading from "../../../components/cards/info/InfoCardLoading";

export default function Info() {
  const [searchParams] = useSearchParams();
  const [anime, setAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [moreEpisodesLoaded, setMoreEpisodesLoaded] = useState(false);
  const [modalDescription, setModalDescription] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(false);
  const [modalEpisode, setModalEpisode] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
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
  }, [searchParams, apiUrl]);

  useEffect(() => {
    if (modalDescription) {
      document.querySelector("body").classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
  }, [modalDescription]);
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
  }, [anime, offsetEpisodes, apiUrl]);

  function handleEpisodeClick(element) {
    setSelectedEpisode(element);
    setModalEpisode(true);
    setTimeout(() => {
      setModalClose(false);
    }, 1);
  }
  return (
    <>
      <div className="relative w-screen h-125 overflow-hidden bottom-20 p">
        {anime?.attributes?.coverImage?.large ? (
          <img
            className="object-cover w-full h-full"
            src={anime?.attributes?.coverImage?.large}
            alt="banner"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-700"></div>
        )}
        <div className="absolute inset-0 bg-gray-950/50">
          {anime && (
            <InfoCard
              anime={anime}
              setModalDescription={setModalDescription}
              setModalClose={setModalClose}
              setModalTrailer={setModalTrailer}
            />
          ) }
        </div>
      </div>
      <div className="loaded flex justify-start items-start gap-5 ml-10 max-md:ml-5 max-m:ml-0">
        <h1 className="text-white font-medium text-2xl">Episodes</h1>
      </div>
      <div className="loaded flex flex-col justify-start items-center mt-5 ml-10 max-md:ml-5 max-m:ml-0">
        <ul className="grid justify-center items-center grid-cols-5 overflow-y-auto h-150 gap-1 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {episodes && episodes.length > 0 ? (
            episodes.map((element) => {
              return (
                <EpisodeCard
                  element={element}
                  anime={anime}
                  handleEpisodeClick={handleEpisodeClick}
                />
              );
            })
          ) : (
            <ul className="w-screen grid justify-center items-center grid-cols-5 overflow-y-auto h-150 gap-2 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <EpisodeCardLoading key={index} />
                ))}
            </ul>
          )}
        </ul>
        {!moreEpisodesLoaded && episodes.length >= 20 && (
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
      {modalDescription && (
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
      )}
      {modalEpisode && (
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
      )}
      {modalTrailer && (
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
      )}
    </>
  );
}

import {
  FaCalendar,
  FaClock,
  FaVideo,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { AiFillFastForward, AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ModalAnime({  anime }) {
  return (
    <>
      {anime ? (
        <div
          className={`w-180 h-160 flex justify-center items-center flex-col  backdrop-blur-2xl rounded-2xl z-1002 text-white  font-medium border-2 `}
        >

          <span className="flex justify-center items-center mt-5 text-center">
            <h1
              className={`${
                anime.attributes.canonicalTitle.length <= 20
                  ? "text-4xl"
                  : "text-[18px]"
              }`}
            >
              {anime.attributes.canonicalTitle}
            </h1>
          </span>
          <div className="flex justify-start m-2 items-start gap-5">
            {anime.attributes.posterImage.medium ? (
              <img
                className="rounded-lg"
                src={anime.attributes.posterImage.medium}
                alt=""
              />
            ) : (
              <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </span>
            )}
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-2  text-orange-500  font-medium ">
                <span className="flex justify-center items-center gap-1">
                  <FaPlay />
                  <h1>
                    {anime.attributes.subtype[0].toUpperCase()}
                    {anime.attributes.subtype.slice(1, 5)}
                  </h1>
                </span>
                <span className="flex justify-center items-center gap-1 w-30">
                  <FaCalendar />
                  <h1>{anime.attributes.startDate}</h1>
                </span>
                {anime.attributes.episodeCount ? (
                  <span className="flex justify-center items-center gap-1">
                    <AiFillFastForward className="text-2xl" />
                    <h1>{anime.attributes.episodeCount}</h1>
                  </span>
                ) : (
                  ""
                )}
                <span className="flex justify-center items-center gap-1">
                  <FaClock />
                  <h1>{anime.attributes.episodeLength}m</h1>
                </span>
              </div>
              <span className="overflow-y-auto h-100  ">
                <h1
                  className={`w-60 ${
                    anime.attributes.description.length > 200
                      ? "text-lg"
                      : "text-2xl"
                  }`}
                >
                  {anime.attributes.description}
                </h1>
              </span>
              {anime.attributes.youtubeVideoId ? (
                <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 mt-5">
                  <FaVideo />
                  <a
                    target="blanc"
                    href={`https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`}
                  >
                    Watch Trailer
                  </a>
                </button>
              ) : (
                <h1 className="text-lg mt-5 bg-amber-600 p-2 rounded-2xl text-center">
                  Can't Find A Trailer :(
                </h1>
              )}
              <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 mt-5">
                <FaInfoCircle />
                <a href={`/info?q=${anime.attributes.canonicalTitle}`}>
                  View Anime Info
                </a>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
          <h1 className=" r">Anime Data Is Loading</h1>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </span>
      )}
    </>
  );
}

import {
  FaCalendar,
  FaClock,
  FaVideo,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { AiFillFastForward, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ModalAnime({ anime }) {
  return (
    <>
      {anime ? (
        <div
          className={`w-180 h-160 flex  items-center flex-col  backdrop-blur-2xl rounded-2xl z-1003 text-white  font-medium border-2 max-lg:w-150 min-sm:justify-center max-lg:h-120 max-sm:w-125 max-sm:h-100 max-s:w-115 max-m:w-100`}
        >
          <h1
            className={`${
              anime.attributes.canonicalTitle.length <= 20
                ? "text-4xl"
                : "text-[18px]"
            } max-lg:text-2xl text-center max-s:text-xl`}
          >
            {anime.attributes.canonicalTitle}
          </h1>
          <div className="flex justify-start m-2 items-start gap-5 max-s:m-1 max-sm:gap-1 max-x:gap-0.5 max-m:w-full">
            {anime?.attributes?.posterImage?.medium ? (
              <img
                className="rounded-lg max-lg:w-60 max-sm:w-50 max-m:w-45 "
                src={anime?.attributes?.posterImage?.medium}
                alt=""
              />
            ) : (
              <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </span>
            )}
            <div className="flex flex-col justify-center items- max-s:justify-start">
              <div className="flex justify-center items-center gap-2 max-m:gap-5   text-orange-500  font-medium max-s:justify-start max-s:text-sm">
                <div className="flex max-m:flex-col justify-center items-center gap-1">
                  <span className="flex justify-center items-center gap-1 max-s:gap-0">
                    <FaPlay />
                    <h1>
                      {anime.attributes.subtype[0].toUpperCase()}
                      {anime.attributes.subtype.slice(1, 5)}
                    </h1>
                  </span>
                  <span className="flex justify-center items-center gap-1 max-s:gap-0  w-max ">
                    <FaCalendar />
                    <h1>{anime.attributes.startDate}</h1>
                  </span>
                </div>
                <div className="flex max-m:flex-col justify-center items-center gap-1">
                  {anime?.attributes?.episodeCount ? (
                    <span className="flex justify-center items-center  max-s:gap-0 gap-1">
                      <AiFillFastForward className="text-2xl" />
                      <h1>{anime.attributes.episodeCount}</h1>
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="flex justify-center items-center gap-1 max-s:gap-0">
                    <FaClock />
                    <h1>{anime.attributes.episodeLength}m</h1>
                  </span>
                </div>
              </div>
              <span className="overflow-y-auto w-max h-100 max-lg:h-60 max-sm:h-40">
                <h1
                  className={`w-60 text-center max-lg:text-lg max-s:w-50  max-m:w-45 max-m:text-left ${
                    anime.attributes.description.length > 200
                      ? "text-lg"
                      : "text-2xl"
                  }`}
                >
                  {anime.attributes.description}
                </h1>
              </span>
              <span className="flex flex-col justify-center items-center max-s:justify-start  ">
                {anime.attributes.youtubeVideoId ? (
                  <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 mt-5 max-lg:p-1 max-lg:mt-2  ">
                    <FaVideo />
                    <a
                      target="blanc"
                      href={`https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`}
                    >
                      Watch Trailer
                    </a>
                  </button>
                ) : (
                  <h1 className="text-lg mt-5 bg-amber-600 p-2 rounded-2xl text-center max-lg:p-1  max-lg:mt-1">
                    Can't Find A Trailer
                  </h1>
                )}
                <button className="flex justify-center items-center bg-orange-500 p-2 gap-1 rounded-2xl  text-lg font-medium transition-transform hover:scale-110 active:scale-90 mt-5 max-lf:mt-2 max-lg:p-1  max-lg:mt-2">
                  <FaInfoCircle />
                  <Link to={`/info?q=${anime.attributes.canonicalTitle}`}>
                    View Anime Info
                  </Link>
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
          <h1 className="">Anime Data Is Loading</h1>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </span>
      )}
    </>
  );
}

import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaClock,
  FaVideo,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { AiFillFastForward } from "react-icons/ai";
export default function BannerDescription({ currentAnime }) {
  return (
    <div className="loaded absolute -translate-y-75 flex flex-col justify-center items-center ml-5 bg-black/50 text-white p-2 rounded-2xl h-60 w-200 max-xl:w-125 max-md:w-100 max-sm:w-75 max-sm:ml-1  max-s:left-1/2 max-s:-translate-x-1/2 max-s:-translate-y-30 max-s:top-1/2 border-2 border-orange-500">
      <h1 className="text-4xl font-bold max-xl:text-2xl max-sm:text-lg">
        {currentAnime.attributes.titles.en
          ? currentAnime.attributes.titles.en
          : currentAnime.attributes.titles.en_jp}
      </h1>
      <hr className="w-full" />
      <div className="flex justify-center items-center gap-2 w-150 text-orange-500 font-medium">
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
        {window.screen.width < 768
          ? currentAnime.attributes.description.slice(0, 100)
          : currentAnime.attributes.description.slice(0, 200)}
        ...
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
          <Link to={`/info?q=${currentAnime.attributes.canonicalTitle}`}>
            View Anime Info
          </Link>
        </button>
      </div>
    </div>
  );
}

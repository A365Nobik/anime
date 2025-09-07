import { FaCalendar, FaClock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Episode({ anime, animeCard }) {
  return (
    <>
      {anime ? (
        <div
          className={`w-180 h-160 flex  items-center flex-col  backdrop-blur-2xl rounded-2xl z-1003 text-white  font-medium border-2 max-lg:w-150 max-lg:h-120 
            max-md:h-100 max-sm:w-125 max-sm:h-100 max-s:w-115 max-m:w-100`}
        >
          <h1 className={` max-lg:text-2xl`}>
            Episode №{anime?.attributes?.number}
          </h1>
          <h1
            className={`${
              anime?.attributes?.canonicalTitle?.length <= 20
                ? "text-4xl"
                : "text-[18px]"
            } max-lg:text-2xl text-center`}
          >
            {anime?.attributes?.canonicalTitle}
          </h1>
          <div className="flex justify-start m-2 items-start gap-5  max-m:w-full">
            {anime?.attributes?.thumbnail?.original ? (
              <img
                className="rounded-lg object-cover w-[390px] h-[555px] max-lg:w-60 max-sm:w-50 max-m:w-45 max-lg:h-[300px] max-s:h-[250px] max-m:ml-2"
                src={anime?.attributes?.thumbnail?.original}
                alt="episode poster"
              />
            ) : (
              <img
                className="rounded-lg max-lg:w-60 max-sm:w-50 max-m:w-45 "
                src={animeCard?.attributes?.posterImage?.medium}
                alt="episode poster"
              />
            )}
            <div className="flex flex-col justify-center items- max-s:justify-start">
              <div className="flex justify-center items-center gap-2 max-m:gap-5   text-orange-500  font-medium max-s:justify-start max-s:text-sm">
                <div className="flex max-m:flex-col justify-center items-center gap-1">
                  {anime?.attributes?.airdate ? (
                    <span className="flex justify-center items-center gap-1 max-s:gap-0  w-max ">
                      <FaCalendar />
                      <h1>{anime?.attributes?.airdate}</h1>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex max-m:flex-col justify-center items-center gap-1">
                  {anime?.attributes?.length ? (
                    <span className="flex justify-center items-center gap-1 max-s:gap-0">
                      <FaClock />
                      <h1>{anime?.attributes?.length}m</h1>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span className="overflow-y-auto w-max h-120 max-lg:h-60 max-s:h-55 ">
                <h1
                  className={`w-60 text-center max-lg:text-lg max-s:w-50  max-m:w-45 max-m:text-left ${
                    anime?.attributes?.description?.length > 200
                      ? "text-lg"
                      : "text-2xl"
                  }`}
                >
                  {anime?.attributes?.description}
                </h1>
              </span>
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

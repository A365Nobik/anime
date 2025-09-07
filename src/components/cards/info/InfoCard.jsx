export default function InfoCard({
  anime,
  setModalDescription,
  setModalClose,
  setModalTrailer,
}) {
  return (
    <div className="loaded flex flex-col justify-start items-start absolute mt-40 ml-5 bg-black/50 rounded-2xl p-2 gap-1 border-2 border-orange-500 max-2xl:ml-0 max-xl:ml-1 max-y:ml-0">
      <h1 className="text-5xl font-medium text-white max-xl:text-4xl max-lg:text-3xl max-sm:text-2xl max-s:text-xl">
        {anime.attributes.canonicalTitle}
      </h1>
      <hr className="text-white w-full" />
      <div className="flex justify-center items-center gap-1   ">
        <h1 className="text-xl font-medium text-white max-md:text-lg">
          {window.screen.width < 695
            ? anime.attributes.description.slice(0, 40)
            : anime.attributes.description.slice(0, 75)}
          ...
          <a
            onClick={() => {
              setModalDescription(true);
              setTimeout(() => {
                setModalClose(false);
              }, 1);
            }}
            className="text-orange-500 text-xl font-medium transition-colors duration-300 delay-75   max-md:text-lg hover:text-orange-800"
          >
            More
          </a>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-1">
        <h1 className="text-white font-medium text-xl max-md:text-lg">
          Show Type:
        </h1>
        <h1 className="text-white font-medium text-xl max-md:text-lg">
          {anime.attributes.showType}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-1">
        <h1 className="text-white font-medium text-xl max-md:text-lg">
          Rating:
        </h1>
        <h1 className="text-white font-medium text-xl max-md:text-lg">
          {Math.round(anime.attributes.averageRating)}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-1">
        <h1 className="text-white font-medium text-xl max-md:text-lg">
          Start Date:
        </h1>
        <h1 className="text-white font-medium text-xl max-md:text-lg">
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
        className="text-orange-500 font-medium text-xl transition-colors duration-300 delay-75 max-md:text-lg hover:text-orange-800"
      >
        Watch Trailer
      </h1>
    </div>
  );
}

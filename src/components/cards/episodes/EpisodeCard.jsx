export default function EpisodeCard({ element, handleEpisodeClick, anime }) {
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
          className="object-cover w-full h-80 rounded-md max-lg:w-110 max-md:w-200 max-md:h-100 max-m:w-160 max-m:h-60"
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
}

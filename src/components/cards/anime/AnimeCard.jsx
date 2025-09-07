import unkPoster from "../../../assets/unkPoster.png";

export default function AnimeCard({ element, handleModalClick }) {
  return (
    <li key={element.id}>
      <div
        className="flex flex-col justify-center items-center transition-transform hover:scale-110 cursor-pointer"
        onClick={() => handleModalClick(element)}
      >
        <span className="flex flex-col items-start justify-center">
          {element?.attributes?.posterImage?.original ? (
            <img
              className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55"
              src={element?.attributes?.posterImage?.original}
              alt="posterImage"
            />
          ) : (
            <img
              className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55"
              src={unkPoster}
              alt="Unknown posterImage"
            />
          )}
          <h1 className="text-lg text-center text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {element.attributes.canonicalTitle.length > 15
              ? element.attributes.canonicalTitle.slice(0, 15) + "..."
              : element.attributes.canonicalTitle}
          </h1>
        </span>
      </div>
    </li>
  );
}

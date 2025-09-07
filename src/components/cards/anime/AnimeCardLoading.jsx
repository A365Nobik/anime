export default function AnimeCardLoading() {
  return (
    <div className="loaded flex flex-col justify-center items-center">
      <span className="flex flex-col items-start justify-center gap-1 bg-gray-900 p-1 rounded-xl">
        <div className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55 animate-pulse bg-gray-800"></div>
        <div className="pulse w-35 h-5 bg-gray-800 rounded-md"></div>
      </span>
    </div>
  );
}

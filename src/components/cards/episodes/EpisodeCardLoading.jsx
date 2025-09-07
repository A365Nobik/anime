export default function EpisodeCardLoading() {
  return (
    <li
      className="w-125 h-80 flex flex-col justify-center items-center relative bg-black/50 border-2 border-orange-500 transition-colors hover:border-white duration-250 rounded-lg animate-pulse">
      <div className="w-50 h-6 animate-pulse bg-gray-700 rounded-md mt-1"></div>
      <div className="w-full h-80 rounded-md max-lg:w-110 max-md:h-60 max-m:w-90 max-m:h-50"></div>
      <div className="text-white font-medium text-md text-center w-[80%] h-4 animate-pulse bg-gray-700 rounded-md mb-1"></div>
      <div className="absolute inset-0 transition-colors duration-150 hover:bg-gray-950/50"></div>
    </li>
  );
}

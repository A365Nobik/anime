import { useSearchParams } from "react-router-dom";

export default function InfoCardLoading() {
  const width = 120;
  const [searchParams] = useSearchParams();
  return (
    <div className="loaded w-200 h-auto flex flex-col justify-start items-start absolute mt-40 ml-5 bg-black/50 rounded-2xl p-2 gap-1 border-2 border-orange-500 max-2xl:ml-0 max-xl:ml-1 max-y:ml-0">
      <div className="text-5xl font-medium text-white max-xl:text-4xl max-lg:text-3xl max-sm:text-2xl max-s:text-xl">
        {searchParams.get("q")}
      </div>
      <hr className="text-white w-full" />
      <div className="w-140 animate-pulse h-6 max-md:w-5 bg-gray-700 rounded-md"></div>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`animate-pulse w-${
              width / (index+1)
            } h-6 max-md:w-5 bg-gray-700 rounded-md`}
          ></div>
        ))}
    </div>
  );
}

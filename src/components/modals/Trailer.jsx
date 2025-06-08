export default function Trailer({ trailer }) {
  return (
    <>
      <div className=" relative flex justify-center items-center  text-center  h-full ml-10 max-2xl:ml-0  ">
        <iframe
          className="rounded-2xl max-2xl:w-300 max-xl:w-250 max-xl:h-175 max-lg:w-225 max-lg:h-145 max-z:w-200 max-z:h-120 max-y:w-175 max-y:h-100 max-c:w-150 max-c:h-80 max-sm:w-125 max-sm:h-65 max-s:w-100 max-s:h-60 max-x:w-90 max-x:h-55"
          width="1300"
          height="750px"
          src={`https://www.youtube.com/embed/${trailer}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}

export default function Trailer({ trailer }) {
  return (
    <>
      {/* <div className="w-350 h-200  backdrop-blur-2xl rounded-2xl z-1002 text-white  font-medium border-2 flex items-start justify-center gap-1 overflow-y-auto ">

      </div> */}
      <div className=" relative flex justify-center items-center  text-center  h-full ml-10   ">
        <iframe
          className="rounded-2xl"
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

export default function Trailer({ trailer }) {
  return (
    <>
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

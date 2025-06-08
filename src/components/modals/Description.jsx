export default function Description({ description }) {
  return (
    <>
      <div className="w-185 h-160  backdrop-blur-2xl rounded-2xl z-1002 text-white  font-medium border-2 flex items-center justify-center overflow-y-auto max-sm:h-165 ">
        <div className=" relative flex justify-center items-center  text-center overflow-y-auto h-full m-1 max-sm:m-0  ">
          <p className=" text-lg max-md:text-[16px]">{description}</p>
        </div>
      </div>
    </>
  );
}

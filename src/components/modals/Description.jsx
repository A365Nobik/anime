export default function Description({ description }) {
  return (
    <>
      <div className="w-185 h-160  backdrop-blur-2xl rounded-2xl z-1002 text-white  font-medium border-2 flex items-center justify-center overflow-y-auto ">
        <div className=" relative flex justify-center items-center  text-center overflow-y-auto h-full m-1  ">
          <p className={`w-150 ${description.length > 200
                      ? "text-lg"
                      : "text-2xl"
                  }`}>{description}</p>
        </div>
      </div>
    </>
  );
}

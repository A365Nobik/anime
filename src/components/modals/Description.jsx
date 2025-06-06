import { IoIosCloseCircle } from "react-icons/io";
export default function Description({ description, setModalClose, setModal }) {
  return (
    <>
      <div className="w-180 h-160  backdrop-blur-2xl rounded-2xl z-1002 text-white  font-medium border-2 flex items-start justify-center gap-1 ">
        <div className=" relative flex justify-center items-center  text-center overflow-y-auto h-150 ml-10 ">
          <p className="text-lg">{description}</p>
        </div>
        <span>
          <IoIosCloseCircle
            className="text-4xl  m-1 transition-transform hover:scale-110 active:scale-80 text-red-600 bg-black rounded-full cursor-pointer"
            onClick={() => {
              setModalClose(true);
              setTimeout(() => {
                setModal(false);
              }, 100);
            }}
          />
        </span>
      </div>
    </>
  );
}

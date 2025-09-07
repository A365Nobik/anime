import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function BannerButtons({ handleLeftClick, handleRightClick }) {
  return (
    <div className="loaded absolute -translate-y-32.5 right-20 flex justify-center items-center gap-3 text-2xl max-s:right-0  max-s:left-0 max-s:-translate-y-15">
      <button
        className="py-4 px-3 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer max-m:py-2.5 max-m:px-2"
        onClick={handleLeftClick}
      >
        <FaArrowLeft className="text-amber-600 " />
      </button>
      <button
        className="py-4 px-3 bg-black border-solid border-2 border-amber-600 hover:scale-105 active:scale-95 transition-all rounded-2xl cursor-pointer max-m:py-2.5 max-m:px-2"
        onClick={handleRightClick}
      >
        <FaArrowRight className="text-amber-600" />
      </button>
    </div>
  );
}

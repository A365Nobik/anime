import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import ModalAnime from "../../../components/modals/ModalAnime";
import Header from "../../../components/layout/header/Header";
import unkPoster from "../../../assets/unkPoster.png";
import { useSearchParams } from "react-router-dom";

export default function Page() {
  const [modal, setModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [modalClose, setModalClose] = useState(false);
  function handleModalClick(element) {
    setSelectedAnime(element);
    setModal(true);
    setTimeout(() => {
      setModalClose(false);
    }, 1);
  }
  useEffect(() => {
    setModal(false);
    const findAnime = async () => {
      const response = await fetch(
        `${apiUrl}/anime?filter[text]=${query}&page[limit]=20&page[offset]=0`
      );
      if (response.ok) {
        const json = await response.json();
        setSearchData(json.data);
      }
    };
    findAnime();
  }, [query]);
  useEffect(() => {
    if (modal) {
      document.querySelector("body").classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
    setModalClose(true);
  }, [modal]);
  return (
    <>
      <Header page={"search"} />
      <main>
        <ul className="grid grid-cols-10 gap-2 justify-center items-center mt-35 result-list max-3xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-3 max-s:grid-cols-2">
          {searchData && searchData.length > 0
            ? searchData.map((element) => {
                return (
                  <li key={element.id}>
                    <div
                      className="flex flex-col justify-center items-center transition-transform hover:scale-110 cursor-pointer"
                      onClick={() => handleModalClick(element)}
                    >
                      <span className="flex flex-col items-start justify-center">
                        {element?.attributes?.posterImage?.original ? (
                          <img
                            className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55"
                            src={element?.attributes?.posterImage?.original}
                            alt="posterImage"
                          />
                        ) : (
                          <img
                            className="w-50 h-65 rounded-lg max-lg:w-40 max-lg:h-55"
                            src={unkPoster}
                            alt="Unknown posterImage"
                          />
                        )}
                        <h1 className="text-lg text-center text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {element.attributes.canonicalTitle.length > 15
                            ? element.attributes.canonicalTitle.slice(0, 15) +
                              "..."
                            : element.attributes.canonicalTitle}
                        </h1>
                      </span>
                    </div>
                  </li>
                );
              })
            : ""}
        </ul>
        {searchData === undefined || searchData === null ? (
          <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
            <h1 className=" r">Anime Data Is Loading</h1>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </span>
        ) : (
          ""
        )}
        {searchData?.length === 0 ? (
          <span className="flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
            <h1 className=" r">Can`t Find Anime With Name {query}</h1>
          </span>
        ) : (
          ""
        )}
        {modal ? (
          <div className={`bg-black/80 inset-0 fixed duration-350 transition-opacity z-1003 ${
              modalClose ? "opacity-0" : "opacity-100"
            }`}>
            <span
              onClick={() => {
                setModalClose(true);
                setTimeout(() => {
                  setModal(false);
                }, 350);
              }}
              className={`flex justify-center items-center  transition-transform fixed inset-0 duration-350 delay-75
              ${modalClose ? "scale-0" : "scale-100"}`}
            >
              <ModalAnime anime={selectedAnime} />
            </span>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

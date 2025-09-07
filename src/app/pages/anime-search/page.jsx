import { useState, useEffect } from "react";
import ModalAnime from "../../../components/modals/ModalAnime";
import { useSearchParams } from "react-router-dom";
import AnimeCard from "../../../components/cards/anime/AnimeCard";
import AnimeCardLoading from "../../../components/cards/anime/AnimeCardLoading";

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
  }, [query, apiUrl]);
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
      <main>
        <ul className="grid grid-cols-10 gap-2 justify-center items-center mt-35 result-list max-3xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-3 max-s:grid-cols-2">
          {searchData &&
            searchData.length > 0 &&
            searchData.map((element) => {
              return (
                <AnimeCard
                  element={element}
                  handleModalClick={handleModalClick}
                />
              );
            })}
        </ul>
        {searchData === undefined ||
          (searchData === null && (
            <div className="grid grid-cols-10 gap-2 justify-center items-center mt-35 result-list max-3xl:grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-3 max-s:grid-cols-2">
              {new Array(20).fill(0).map((_, index) => (
                <AnimeCardLoading key={index} />
              ))}
            </div>
          ))}

        {searchData?.length === 0 && (
          <span className="loaded flex justify-center items-center text-5xl text-white font-bold mt-10 gap-2">
            <h1 className=" r">Can`t Find Anime With Name {query}</h1>
          </span>
        )}
        {modal && (
          <div
            className={`bg-black/80 inset-0 fixed duration-350 transition-opacity z-1003 ${
              modalClose ? "opacity-0" : "opacity-100"
            }`}
          >
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
        )}
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import ModalAnime from "../../../components/modals/ModalAnime";
import Banner from "../../../components/cards/banner/Banner";
import AnimeCard from "../../../components/cards/anime/AnimeCard";
import AnimeCardLoading from "../../../components/cards/anime/AnimeCardLoading";
export default function Page() {
  const [trendingList, setTrendingList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/anime?filter[status]=current&page[limit]=20&page[offset]=0&sort=-userCount`
        );
        if (response.ok) {
          const json = await response.json();
          setTrendingList(json.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getTrending();
  }, [apiUrl]);

  useEffect(() => {
    if (modal) {
      document.querySelector("body").classList.add("overflow-y-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-y-hidden");
    }
  }, [modal]);

  function handleModalClick(element) {
    setSelectedAnime(element);
    setModal(true);
    setTimeout(() => {
      setModalClose(false);
    }, 1);
  }
  return (
    <>
      <Banner apiUrl={apiUrl} />
      <main>
        <div className="ml-5 relative bottom-15 flex flex-col max-lg:ml-1 ">
          <h1 className="loaded text-white text-5xl font-medium mb-5 max-xl:text-3xl  ">
            Trending Anime
          </h1>
          <ul className="grid grid-cols-10 gap-2  justify-center items-center trending-list max-2xl:grid-cols-5 max-lg:grid-cols-4  max-md:grid-cols-3 max-s:grid-cols-2 ">
            {trendingList && trendingList.length > 0 ? (
              trendingList.map((element) => {
                return (
                  <AnimeCard
                    element={element}
                    handleModalClick={handleModalClick}
                  />
                );
              })
            ) : (
             Array(20).fill(0).map((_,index)=>(
              <AnimeCardLoading key={index}/>
             ))
            )}
          </ul>
        </div>
        {modal ? (
          <div
            className={`bg-black/80 inset-0 fixed duration-350 transition-opacity z-1003 ${
              modalClose ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              onClick={() => {
                setModalClose(true);
                setTimeout(() => {
                  setModal(false);
                }, 350);
              }}
              className={`fixed inset-0 flex justify-center items-center  z-1001 transition-transform duration-350 delay-75 ${
                modalClose ? "scale-0" : "scale-100"
              }`}
            >
              <ModalAnime anime={selectedAnime} />
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
